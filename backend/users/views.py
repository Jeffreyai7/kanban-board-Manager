from rest_framework.views import APIView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import VerificationCode
from .serializers import CustomRegisterSerializer, SendCodeSerializer, VerifyCodeSerializer, UserDetailSerializer
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings


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

    def post(self, request):
        serializer = CustomRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            code_obj = VerificationCode.objects.create(
                user=user,
                purpose='email'
            )
            user.email_user(
                subject="Verify your email",
                message=f"Your verification code is: {code_obj.code}"
            )
            return Response({
                'message': 'User created successfully. Please verify your email before logging in.',
                'user_id': user.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
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
            }, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        print("Logout request data:", request.data)
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    


class SendCodeView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SendCodeSerializer

    def perform_create(self, serializer):
        code_obj = serializer.save()
        if code_obj.purpose == 'email':
            # send via Django email
            code_obj.user.email_user(
                subject="Your Verification Code",
                message=f"Use this code: {code_obj.code}"
            )
        else:
            # send via Twilio SMS
            from twilio.rest import Client
            client = Client(settings.TWILIO_SID, settings.TWILIO_AUTH)
            client.messages.create(
                body=f"Your code: {code_obj.code}",
                from_=settings.TWILIO_FROM,
                to=code_obj.user.phone_number
            )


class VerifyCodeView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = VerifyCodeSerializer

    def post(self, request, *args, **kwargs):
        data = self.get_serializer(data=request.data)
        data.is_valid(raise_exception=True)
        code_obj = VerificationCode.objects.filter(
            code=data.validated_data['code'],
            purpose=data.validated_data['purpose'],
            user__pk=data.validated_data['user_id']
        ).first()
        if not code_obj or code_obj.is_expired():
            return Response({"detail": "Invalid or expired code"}, status=status.HTTP_400_BAD_REQUEST)
        
        if code_obj.purpose == 'email':
            code_obj.user.is_email_verified = True
        else:
            code_obj.user.is_phone_verified = True
        code_obj.user.save()
        code_obj.delete()
        return Response({"detail": "Verified"}, status=status.HTTP_200_OK)



class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:8000"  # or your frontend URL
    client_class = OAuth2Client
