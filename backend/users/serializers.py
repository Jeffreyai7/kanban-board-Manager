from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import VerificationCode, CustomUser


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


class CustomRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True,)
    password2 = serializers.CharField(write_only=True,)
    fName = serializers.CharField(max_length=30, required=True)
    lName = serializers.CharField(max_length=30, required=False)
    phone_number = serializers.CharField(max_length=20, required=False)

    class Meta:
        model = CustomUser
        fields = ['email', 'password1', 'password2', 'fName', 'lName', 'phone_number']
    
    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password1')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','email','phone_number', 'fName', 'lName')
        
class SendCodeSerializer(serializers.ModelSerializer):
    purpose = serializers.ChoiceField(choices=VerificationCode.PURPOSE_CHOICES)
    user_id = serializers.IntegerField()

    class Meta:
        model = VerificationCode
        fields = ('user_id', 'purpose')

    def create(self, validated_data):
        try:
            user = CustomUser.objects.get(pk=validated_data['user_id'])
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({'user_id': 'User with this ID does not exist.'})
        # delete any old codes for the same purpose
        VerificationCode.objects.filter(user=user, purpose=validated_data['purpose']).delete()
        return VerificationCode.objects.create(user=user, purpose=validated_data['purpose'])
    
    
class VerifyCodeSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    code = serializers.UUIDField()
    purpose = serializers.ChoiceField(choices=VerificationCode.PURPOSE_CHOICES)