from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from datetime import timedelta
from django.utils import timezone
from django.conf import settings
from django.db import models

"""
Custom User model that extends AbstractUser to include additional fields
"""

class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)


class VerificationCode(models.Model):
    PURPOSE_CHOICES = [('email', 'email'), ('phone', 'phone')]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Renamed from 'username' to 'user'
    code = models.UUIDField(default=uuid.uuid4, editable=False)
    purpose = models.CharField(max_length=10, choices=PURPOSE_CHOICES)
    created = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        # Expires after 10 minutes
        return timezone.now() > (self.created + timedelta(minutes=10))

    def __str__(self):
        return f"{self.user.username} - {self.purpose} - {self.code}"