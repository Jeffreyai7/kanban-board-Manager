from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import VerificationCode
from .serializers import CustomRegisterSerializer, ErrorResponseSerializer, RegistrationResponseSerializer, SendCodeSerializer, VerifyCodeSerializer, UserDetailSerializer
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
import logging
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiRequest, OpenApiExample



logger = logging.getLogger(__name__)


class EmailService:
    """Service class to handle all email operations"""
    
    @staticmethod
    def send_verification_email(user, verification_code):
        """Send verification code email"""
        try:
            subject = "Verify Your Email - Kanban Board"
            message = f"""Hello {user.fName or user.email},

Thank you for registering with Kanban Board Manager.
Please use this verification code to verify your email: {verification_code}

This code will expire in 10 minutes.

Kanban Board Manager"""
            
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
            
            logger.info(f"Verification email sent successfully to {user.email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send verification email to {user.email}: {str(e)}")
            return False

    @staticmethod
    def send_welcome_email(user):
        """Send welcome email"""
        try:
            subject = "Welcome to Kanban Board Manager!"
            message = f"""Hello {user.fName or user.email},

Welcome to Kanban Board Manager! We're excited to have you on board.

Getting Started:
- Create your first project board
- Add tasks and organize them by status
- Invite team members to collaborate
- Track progress and stay organized

If you have any questions, don't hesitate to reach out!

Kanban Board Manager"""
            
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
            
            logger.info(f"Welcome email sent successfully to {user.email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send welcome email to {user.email}: {str(e)}")
            return False

    @staticmethod
    def send_code_email(user, code, purpose):
        """Send verification code for various purposes"""
        try:
            if purpose == 'email':
                subject = "Your Verification Code - Kanban Board"
                purpose_text = "email verification"
            else:
                subject = "Your Security Code - Kanban Board"
                purpose_text = "account verification"
            
            message = f"""Hello {user.fName or user.email},

Please use this code for {purpose_text}: {code}

This code will expire in 10 minutes.

Kanban Board Manager"""
            
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
            
            logger.info(f"Code email sent successfully to {user.email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send code email to {user.email}: {str(e)}")
            return False
    


"""
users/views.py
==============

This module contains API views for user authentication and verification in the Kanban Board Manager backend.
It provides endpoints for user registration, login, logout, user detail retrieval, sending and verifying codes
(for email and phone verification), and Google social login.

Classes:
--------

- RegisterView: Handles user registration and sends a verification code to the user's email.
- LoginView: Authenticates users and issues JWT tokens if credentials are valid and email is verified.
- LogoutView: Blacklists the refresh token to log out the user.
- UserDetailView: Retrieves details of the currently authenticated user.
- SendCodeView: Sends a verification code to the user's email or phone (via Twilio SMS).
- VerifyCodeView: Verifies the code sent to the user for email or phone verification.
- GoogleLogin: Handles Google OAuth2 social login.

Dependencies:
-------------

- Django REST Framework
- dj-rest-auth
- django-allauth
- djangorestframework-simplejwt
- Twilio (for SMS)
- Custom serializers and models from the users app
"""


class RegisterView(APIView):
    
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="User Registration",
        description="""
        Register a new user account in the Kanban Board Manager system.
        """,
        request=CustomRegisterSerializer,
        responses={
            201: OpenApiResponse(
                description='Registration successful',
                response=RegistrationResponseSerializer,
                examples=[
                    OpenApiExample(
                        'Registration Success',
                        value={
                            "message": "User registered successfully",
                            "user": {
                                "id": 1,
                                "email": "newuser@example.com",
                                "fName": "Jane",
                                "lName": "Smith",
                                "phone_number": "+1234567890",
                                "is_verified": False
                            },
                            "verification_required": True
                        }
                    )
                ]
            ),
            400: OpenApiResponse(
                description='Registration failed due to validation errors',
                response=ErrorResponseSerializer,
                examples=[
                    OpenApiExample(
                        'Validation Errors',
                        value={
                            "error": "Registration failed",
                            "details": {
                                "email": ["A user with this email already exists."],
                                "password2": ["Passwords do not match."],
                            }
                        }
                    )
                ]
            ),
            500: OpenApiResponse(
                description='Internal server error',
                response=ErrorResponseSerializer,
                examples=[
                    OpenApiExample(
                        'Server Error',
                        value={
                            "error": "Registration failed",
                            "details": "An unexpected error occurred. Please try again later."
                        }
                    )
                ]
            )
        },
        tags=['Authentication']

    )

    def post(self, request):
        serializer = CustomRegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            with transaction.atomic():
                user = serializer.save()
                code_obj = VerificationCode.objects.create(
                    user=user,
                    purpose='email'
                )
                
                
                verification_sent = EmailService.send_verification_email(user, code_obj.code)
                welcome_sent = EmailService.send_welcome_email(user)
                
                if not verification_sent:
                    logger.warning(f"Verification email failed for user {user.email}")
                    
                
                return Response({
                    'message': 'User created successfully. Please verify your email before logging in.',
                    'user_id': user.id,
                    'verification_email_sent': verification_sent,
                    # 'welcome_email_sent': welcome_sent
                }, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            logger.error(f"Registration failed for email {request.data.get('email', 'unknown')}: {str(e)}")
            return Response({
                'message': 'Registration failed. Please try again later.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="User Login",
        description="""
        Authenticate a user and return JWT tokens if successful.
        Users must verify their email before logging in.
        """,
        request=OpenApiRequest(
            examples=[
                OpenApiExample(
                    'Login Request',
                    value={
                        'email': "user@example.com",
                        'password': "Strongpassword1"
                    }
                )
            ]
        ),
        responses={
            200: OpenApiResponse(
                description='Login successful',
                response={
                    'refresh': "refresh_token",
                    'access': "access_token",
                    'user': {
                        'id': 1,
                        'email': "user@example.com",
                        'fName': "Jane",
                        'lName': "Smith"
                    }
                },
                examples=[
                    OpenApiExample(
                        'Login Success',
                        value={
                            "refresh": "refresh_token",
                            "access": "access_token",
                            "user": {
                                "id": 1,
                                "email": "user@example.com",
                                "fName": "Jane",
                                "lName": "Smith"
                            }
                        }
                    )
                ]
            ),
            400: OpenApiResponse(
                description='Bad request, missing email or password',
                response={
                    'detail': "Email and password are required"
                },
                examples=[
                    OpenApiExample(
                        'Missing Fields',
                        value={
                            "detail": "Email and password are required"
                        }
                    )
                ]
            ),
            401: OpenApiResponse(
                description='Invalid credentials',
                response={
                    'detail': "Invalid credentials"
                },
                examples=[
                    OpenApiExample(
                        'Invalid Credentials',
                        value={
                            "detail": "Invalid credentials, please check your email and password."
                        }
                    )
                ]
            ),
            403: OpenApiResponse(
                description='Forbidden, email not verified',
                response={
                    "detail": "Please verify your email before logging in."
                },
                examples=[
                    OpenApiExample(
                        'Email Not Verified',
                        value={
                            "detail": "Please verify your email before logging in."
                        }
                    )
                ]
            )
        },
        tags=['Authentication']
    )

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        if not email or not password:
            return Response(
                {"detail": "Email and password are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(email=email, password=password)

        if user:
            if not user.is_email_verified:
                return Response(
                    {"detail": "Please verify your email before logging in."},
                    status=status.HTTP_403_FORBIDDEN
                )
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'fName': user.fName,
                    'lName': user.lName,
                }
            }, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="User Logout",
        description="""
        Log out the user by blacklisting the refresh token.
        This will invalidate the user's session.

        Authorization Required: You must pass the access token in the Authorization header as Bearer token.

        Authorization: Bearer <access_token>
        """,
        request=OpenApiRequest(
            examples=[
                OpenApiExample(
                    'Logout Request',
                    value={
                        'refresh': "your_refresh_token"
                    }  
                )
            ]
        ),
        responses={
            205: OpenApiResponse(
                description='Logout successful',
                response={
                    "detail": "Successfully logged out"
                },
                examples=[
                    OpenApiExample(
                        'Logout Success',
                        value={
                            "detail": "Successfully logged out"
                        }
                    )
                ]
            ),
            400: OpenApiResponse(
                description='Bad request, missing refresh token',
                response={
                    "detail": "Refresh token is required"
                },
                examples=[
                    OpenApiExample(
                        'Missing Refresh Token',
                        value={
                            "detail": "Refresh token is required"
                        }
                    )
                ]
            )
        },
        tags=['Authentication'],
        auth=[{'Bearer': []}]
    )

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response(
                    {"detail": "Refresh token is required"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"detail": "Successfully logged out"}, 
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            logger.error(f"Logout failed: {str(e)}")
            return Response(
                {"detail": "Invalid token"}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Get User Details",
        description="""
        Retrieve the details of the authenticated user.
        This includes user_id, email, name, phone number.

        Authorization Required: You must pass the access token in the Authorization header as Bearer token.

        Authorization: Bearer <access_token>
        """,
        responses={
            200: OpenApiResponse(
                description='User details retrieved successfully',
                response=UserDetailSerializer,
                examples=[
                    OpenApiExample(
                        'User Details',
                        value={
                            "id": 1,
                            "email": "newuser@example.com",
                            "fName": "Jane",
                            "lName": "Smith",
                            "phone_number": "+1234567890"
                        }    
                    )
                ]
            ),
            401: OpenApiResponse(
                description='Unauthorized, user not authenticated',
                response={
                    "detail": "Authentication credentials were not provided."
                },
                examples=[
                    OpenApiExample(
                        'Unauthorized',
                        value={
                            "detail": "Authentication credentials were not provided."
                        }
                    )
                ]
            ),
            404: OpenApiResponse(
                description='User not found',
                response={
                    "detail": "User not found"
                },
                examples=[
                    OpenApiExample(
                        'User Not Found',
                        value={
                            "detail": "User not found"
                        }
                    )
                ]
            )
        },
        tags=['User Management']
    )
        

    def get_object(self):
        return self.request.user


@extend_schema(
        summary="Send Verification Code",
        description="""
        Sends a verification code to the user's email based on the purpose (e.g., email verification).
        The code expires in 10 minutes.

        Authorization Required: You must pass the access token in the Authorization header as Bearer token.
        
        Authorization: Bearer <access_token>
        """,
        request=SendCodeSerializer,
        responses={
            201: OpenApiResponse(
                description="Code sent successfully",
                examples=[
                    OpenApiExample(
                        'Success',
                        value={
                            "message": "Verification code sent successfully."
                        }
                    )
                ]
            ),
            400: OpenApiResponse(
                description="Validation error",
                response=ErrorResponseSerializer,
                examples=[
                    OpenApiExample(
                        'Validation Error',
                        value={
                            "email": ["This field is required."]
                        }
                    )
                ]
            )
        },
        tags=["Authentication"]
    )

class SendCodeView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SendCodeSerializer

    def perform_create(self, serializer):
        code_obj = serializer.save()
        
        if code_obj.purpose == 'email':
            success = EmailService.send_code_email(
                code_obj.user, 
                code_obj.code, 
                code_obj.purpose
            )
            if not success:
                logger.error(f"Failed to send verification code to {code_obj.user.email}")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Verification code sent successfully."},
            status=status.HTTP_201_CREATED
        )

        # else:
        #     # Send via Twilio SMS
        #     try:
        #         from twilio.rest import Client
        #         client = Client(settings.TWILIO_SID, settings.TWILIO_AUTH)
        #         client.messages.create(
        #             body=f"Your Kanban Board verification code: {code_obj.code}",
        #             from_=settings.TWILIO_FROM,
        #             to=code_obj.user.phone_number
        #         )
        #         logger.info(f"SMS code sent successfully to {code_obj.user.phone_number}")
        #     except Exception as e:
        #         logger.error(f"Failed to send SMS code: {str(e)}")



@extend_schema(
    summary="Verify Code",
    description="""
    Verifies the code sent to the user (usually for email verification).
    If valid and not expired, updates the user status and deletes the code.
    """,
    request=VerifyCodeSerializer,
    responses={
        200: OpenApiResponse(
            description="Verification successful",
            examples=[
                OpenApiExample(
                    'Success',
                    value={"detail": "Verified successfully"}
                )
            ]
        ),
        400: OpenApiResponse(
            description="Invalid or expired code",
            examples=[
                OpenApiExample(
                    'Expired or Invalid Code',
                    value={"detail": "Invalid or expired code"}
                )
            ]
        ),
        500: OpenApiResponse(
            description="Server error",
            examples=[
                OpenApiExample(
                    'Server Failure',
                    value={"detail": "Verification failed"}
                )
            ]
        )
    },
    tags=["Authentication"]
)

class VerifyCodeView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = VerifyCodeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            code_obj = VerificationCode.objects.filter(
                code=serializer.validated_data['code'],
                purpose=serializer.validated_data['purpose'],
                user__pk=serializer.validated_data['user_id']
            ).first()
            
            if not code_obj or code_obj.is_expired():
                return Response(
                    {"detail": "Invalid or expired code"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Update user verification status
            if code_obj.purpose == 'email':
                code_obj.user.is_email_verified = True
                code_obj.user.save()
                EmailService.send_welcome_email(code_obj.user)
            # else:
            #     code_obj.user.is_phone_verified = True
            
            code_obj.delete()
            
            return Response(
                {"detail": "Verified successfully"}, 
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            logger.error(f"Code verification failed: {str(e)}")
            return Response(
                {"detail": "Verification failed"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@extend_schema(
    summary="Google Login",
    description="""
    Authenticate or register a user using Google OAuth2.

    The frontend must first obtain a Google OAuth2 access token from the Google Sign-In flow, 
    then POST that token to this endpoint.

    On success, the API returns access and refresh JWT tokens along with user profile data.
    """,
    request=OpenApiRequest(
        examples=[
            OpenApiExample(
                'Google Login Request',
                value={
                    "access_token": "<google_oauth2_access_token>"
                }
            )
        ]
    ),
    responses={
        200: OpenApiResponse(
            description="Login successful",
            examples=[
                OpenApiExample(
                    'Login Success',
                    value={
                        "refresh": "refresh_token",
                        "access": "access_token",
                        "user": {
                            "id": 1,
                            "email": "user@example.com",
                            "fName": "Jane",
                            "lName": "Smith"
                        }
                    }
                )
            ]
        ),
        400: OpenApiResponse(
            description="Invalid Google token or missing access_token",
            examples=[
                OpenApiExample(
                    'Invalid Token',
                    value={
                        "detail": "Invalid Google token."
                    }
                )
            ]
        )
    },
    tags=["Authentication"]
)

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:8000"  # Update this for production
    client_class = OAuth2Client


@csrf_exempt
def test_email(request):
    """Test endpoint to verify email functionality"""
    try:
        subject = "Test Email - Kanban Board"
        message = """Email Test Successful!

This is a test email from your Kanban Board application.
If you're seeing this, your email configuration is working correctly.

Kanban Board Manager"""
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=False,
        )
        
        return JsonResponse({
            'status': 'success',
            'message': 'Test email sent successfully'
        })
        
    except Exception as e:
        logger.error(f"Test email failed: {str(e)}")
        return JsonResponse({
            'status': 'error', 
            'error': str(e)
        }, status=500)