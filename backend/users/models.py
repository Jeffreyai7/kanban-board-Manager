from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid
from datetime import timedelta
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings
from django.core.mail import send_mail


"""
models.py

This module defines the database models for user management in the Kanban Board Manager backend.

Classes:
    UserManager: Custom manager for creating users and superusers using email as the unique identifier.
    CustomUser: Custom user model extending AbstractBaseUser and PermissionsMixin, using email for authentication.
    VerificationCode: Model for storing verification codes for email and phone verification.

Details:

- CustomUser:
    - Fields: email, fName, lName, phone_number, is_active, is_staff, is_email_verified, is_phone_verified.
    - Uses email as the USERNAME_FIELD for authentication.
    - Includes a helper method email_user for sending emails to the user.

- UserManager:
    - Handles creation of regular users and superusers.
    - Ensures email is provided and normalized.

- VerificationCode:
    - Stores a UUID code for either email or phone verification.
    - Linked to a user via ForeignKey.
    - Includes a method is_expired to check if the code is older than 10 minutes.

Dependencies:
    - Django ORM
    - django-phonenumber-field for phone number validation
    - Django settings for custom user model reference
    - send_mail for email functionality
"""

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=False, blank=False)
    fName = models.CharField(max_length=30)
    lName = models.CharField(max_length=30)
    phone_number = PhoneNumberField()
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

class VerificationCode(models.Model):
    PURPOSE_CHOICES = [('email', 'email'), ('phone', 'phone')]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.UUIDField(default=uuid.uuid4, editable=False)
    purpose = models.CharField(max_length=10, choices=PURPOSE_CHOICES)
    created = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        # Expires after 10 minutes
        return timezone.now() > (self.created + timedelta(minutes=10))

    def __str__(self):
        return self.user.email