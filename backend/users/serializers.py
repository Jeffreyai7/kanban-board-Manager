from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import VerificationCode, CustomUser
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample
from django.contrib.auth.password_validation import validate_password


"""
serializers.py
==============
This module contains serializer classes for user registration, user details, and verification code management
in the Kanban Board Manager backend application.

Classes:
--------

- CustomRegisterSerializer:
    Handles user registration, including email and password validation, and user creation.
    Ensures unique email addresses and matching passwords.

- UserDetailSerializer:
    Serializes user details for retrieval, including id, email, phone number, first name, and last name.

- SendCodeSerializer:
    Handles the creation of verification codes for specific purposes (e.g., email verification, password reset).
    Validates user existence and ensures only one active code per purpose per user.

- VerifyCodeSerializer:
    Validates the input for verifying a code, including user ID, code, and purpose.

Dependencies:
-------------
- Django REST Framework serializers
- Django's get_user_model
- CustomUser and VerificationCode models

Usage:
------
Import and use these serializers in views for user registration, detail retrieval, and verification code workflows.
"""


User = get_user_model()


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'User Registration Example',
            summary='Complete user registration',
            description='Register a new user with all required information',
            value={
                "email": "testuser@example.com",
                "fName": "John",
                "lName": "Doe",
                "phone_number": "+1234567890",
                "password1": "SecurePassword123!",
                "password2": "SecurePassword123!",
            }
        )
    ]
)
class CustomRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        help_text="User's email address (must be unique)",
        error_messages={
            'required': 'Email address is required.',
            'invalid': 'Enter a valid email address.'
        }
    )
    password1 = serializers.CharField(
        write_only=True,
        validators=[validate_password],
        help_text="Password must be at least 8 characters with mixed case, numbers and symbols",
        style={'input_type': 'password'},
        error_messages={
            'required': 'Password is required.',
            'blank': 'Password cannot be blank.'
        }
    )
    password2 = serializers.CharField(
        write_only=True,
        help_text="Confirm your password (must match password1)",
        style={'input_type': 'password'},
        error_messages={
            'required': 'Password confirmation is required.',
            'blank': 'Password confirmation cannot be blank.'
        }
    )
    fName = serializers.CharField(
        max_length=30, 
        required=True,
        help_text="User's first name",
        error_messages={
            'required': 'First name is required.',
            'max_length': 'First name cannot exceed 30 characters.'
        }
    )
    lName = serializers.CharField(
        max_length=30, 
        required=False,
        allow_blank=True,
        help_text="User's last name (optional)",
        error_messages={
            'max_length': 'Last name cannot exceed 30 characters.'
        }
    )
    phone_number = serializers.CharField(
        max_length=20, 
        required=False,
        allow_blank=True,
        help_text="User's phone number",
        error_messages={
            'max_length': 'Phone number cannot exceed 20 characters.'
        }
    )

    class Meta:
        model = CustomUser
        fields = ['email', 'password1', 'password2', 'fName', 'lName', 'phone_number']
        ref_name = 'UserRegistration'
    
    def validate_email(self, value):
        """
        Validate that the email is unique in the system.
        """
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value.lower()

    def validate(self, data):
        if data.get('password1') != data.get('password2'):
            raise serializers.ValidationError({
                'password2': "Passwords do not match."
            })
        return data

    def create(self, validated_data):

        validated_data.pop('password2')
        password = validated_data.pop('password1')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'User Details Response',
            value={
                "id": 1,
                "email": "user@example.com",
                "phone_number": "+1234567890",
                "fName": "John",
                "lName": "Doe"
            }
        )
    ]
)
class UserDetailSerializer(serializers.ModelSerializer):
    is_verified = serializers.SerializerMethodField(
        help_text="Has the user's email has been verified"
    )

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'phone_number', 'fName', 'lName', 'is_verified')
        read_only_fields = ('id', 'is_verified')
        extra_kwargs = {
            'email': {
                'help_text': "User's email address",
                'error_messages': {
                    'invalid': 'Enter a valid email address.'
                }
            },
            'phone_number': {
                'help_text': "User's phone number",
                'allow_blank': True
            },
            'fName': {
                'help_text': "User's first name",
                'error_messages': {
                    'required': 'First name is required.',
                    'max_length': 'First name cannot exceed 30 characters.'
                }
            },
            'lName': {
                'help_text': "User's last name",
                'allow_blank': True,
                'error_messages': {
                    'max_length': 'Last name cannot exceed 30 characters.'
                }
            }
        }
        ref_name = 'UserDetail'
    
    def get_is_verified(self, obj):
        
        return getattr(obj, 'is_email_verified', False)


    def validate_email(self, value):
       
        if self.instance and value != self.instance.email:
            if CustomUser.objects.filter(email=value).exists():
                raise serializers.ValidationError("A user with this email already exists.")
        return value.lower()


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Send Email Verification Code',
            summary='Send code for email verification',
            value={
                "user_id": 1,
                "purpose": "email"
            }
        )
    ]
)
class SendCodeSerializer(serializers.ModelSerializer):
    purpose = serializers.ChoiceField(
        choices=VerificationCode.PURPOSE_CHOICES,
        help_text="Purpose of the verification code",
        error_messages={
            'required': 'Purpose is required.',
            'invalid_choice': 'Select a valid purpose.'
        }
    )
    user_id = serializers.IntegerField(
        help_text="ID of the user to send verification code to",
        error_messages={
            'required': 'User ID is required.',
            'invalid': 'User ID must be a valid integer.'
        }
    )

    class Meta:
        model = VerificationCode
        fields = ('user_id', 'purpose')
        ref_name = 'SendVerificationCode'

    def validate_user_id(self, value):
       
        try:
            user = CustomUser.objects.get(pk=value)
            return value
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError('User with this ID does not exist.')

    def validate(self, data):
        
        try:
            user = CustomUser.objects.get(pk=data['user_id'])
            purpose = data['purpose']

            if purpose == 'email' and getattr(user, 'is_email_verified', False):
                raise serializers.ValidationError({
                    'purpose': 'User email is already verified.'
                })
    
            
        except CustomUser.DoesNotExist:
            pass
            
        return data

    def create(self, validated_data):
        """
        Create a new verification code, removing any existing codes for the same purpose.
        """
        try:
            user = CustomUser.objects.get(pk=validated_data['user_id'])
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({'user_id': 'User with this ID does not exist.'})
        
        # Delete any existing codes for the same purpose
        VerificationCode.objects.filter(user=user, purpose=validated_data['purpose']).delete()
        
        # Create new verification code
        return VerificationCode.objects.create(user=user, purpose=validated_data['purpose'])


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Verify Email Code',
            summary='Verify email verification code',
            value={
                "user_id": 1,
                "code": "123456",
                "purpose": "email"
            }
        )
    ]
)
class VerifyCodeSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(
        help_text="ID of the user verifying the code",
        error_messages={
            'required': 'User ID is required.',
            'invalid': 'User ID must be a valid integer.'
        }
    )
    code = serializers.CharField(
        max_length=6,
        help_text="Verification code received by user",
        error_messages={
            'required': 'Verification code is required.',
            'blank': 'Verification code cannot be blank.',
            'max_length': 'Verification code cannot exceed 10 characters.'
        }
    )
    purpose = serializers.ChoiceField(
        choices=VerificationCode.PURPOSE_CHOICES,
        help_text="Purpose of the verification code",
        error_messages={
            'required': 'Purpose is required.',
            'invalid_choice': 'Select a valid purpose.'
        }
    )

    class Meta:
        ref_name = 'VerifyCodeInput'

    def validate_user_id(self, value):
        """
        Validate that the user exists.
        """
        try:
            CustomUser.objects.get(pk=value)
            return value
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError('User with this ID does not exist.')

    def validate_code(self, value):
        """
        Basic code format validation.
        """
        # Remove whitespace and convert to uppercase for consistency
        code = value.strip().upper()
        
        # Check if code contains only alphanumeric characters
        if not code.isalnum():
            raise serializers.ValidationError('Verification code must contain only letters and numbers.')
        
        return code

    def validate(self, data):
        """
        Validate that the verification code exists and is valid.
        """
        try:
            user = CustomUser.objects.get(pk=data['user_id'])
            code = data['code'].strip().upper()
            purpose = data['purpose']
            
            # Check if verification code exists and is still valid
            verification_code = VerificationCode.objects.filter(
                user=user,
                code=code,
                purpose=purpose
            ).first()
            
            if not verification_code:
                raise serializers.ValidationError({
                    'code': 'Invalid or expired verification code.'
                })
            
            # Check if code has expired
            if verification_code.is_expired():
                raise serializers.ValidationError({
                    'code': 'Verification code has expired. Please request a new one.'
                })
            
        except CustomUser.DoesNotExist:
            # This should be caught by validate_user_id, but adding for safety
            raise serializers.ValidationError({
                'user_id': 'User with this ID does not exist.'
            })
        
        return data


"""
Response Serializers
==================
This section contains serializers for the responses returned by the user management endpoints."""
@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Registration Success Response',
            value={
                "message": "User registered successfully",
                "user": {
                    "id": 1,
                    "email": "user@example.com",
                    "fName": "John",
                    "lName": "Doe",
                    "phone_number": "+1234567890"
                },
                "verification_required": True
            }
        )
    ]
)
class RegistrationResponseSerializer(serializers.Serializer):
    message = serializers.CharField(help_text="Success message")
    user = UserDetailSerializer(help_text="Created user details")
    verification_required = serializers.BooleanField(help_text="Whether email verification is required")

    class Meta:
        ref_name = 'RegistrationResponse'


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Code Sent Response',
            value={
                "message": "Verification code sent successfully",
                "code_id": 123,
                "expires_at": "2024-12-01T16:00:00Z",
                "can_resend_after": "2024-12-01T15:05:00Z"
            }
        )
    ]
)
class CodeSentResponseSerializer(serializers.Serializer):
    message = serializers.CharField(help_text="Success message")
    code_id = serializers.IntegerField(help_text="Verification code ID for tracking")
    expires_at = serializers.DateTimeField(help_text="When the code expires")
    can_resend_after = serializers.DateTimeField(help_text="When user can request another code")

    class Meta:
        ref_name = 'CodeSentResponse'


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Code Verification Success',
            value={
                "message": "Code verified successfully",
                "verified": True,
                "purpose": "email_verification",
                "next_action": "User can now access all features"
            }
        )
    ]
)
class CodeVerificationResponseSerializer(serializers.Serializer):
    message = serializers.CharField(help_text="Success message")
    verified = serializers.BooleanField(help_text="Whether verification was successful")
    purpose = serializers.CharField(help_text="Purpose that was verified")
    next_action = serializers.CharField(help_text="What the user should do next")

    class Meta:
        ref_name = 'CodeVerificationResponse'



@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Validation Error Response',
            value={
                "error": "Validation failed",
                "details": {
                    "email": ["A user with this email already exists."],
                    "password2": ["Passwords do not match."]
                }
            }
        )
    ]
)
class ErrorResponseSerializer(serializers.Serializer):
    error = serializers.CharField(help_text="Error type or message")
    details = serializers.DictField(
        required=False,
        help_text="Field-specific error details"
    )

    class Meta:
        ref_name = 'ErrorResponse'