from django.urls import path
from .views import LoginView, LogoutView, RegisterView, UserDetailView, SendCodeView, VerifyCodeView, GoogleLogin
from rest_framework_simplejwt.views import TokenRefreshView


"""
users/urls.py

This module defines the URL patterns for the user management features of the Kanban Board Manager backend.
It maps HTTP endpoints to their corresponding view classes, handling user authentication, registration,
profile management, and integration with Google login.

Endpoints:
- user-detail: Retrieve details of the authenticated user.
- send-code: Send a verification code to the user (e.g., for email/phone verification).
- verify-code: Verify the code sent to the user.
- google-login: Authenticate users via Google OAuth.
- register: Register a new user account.
- login: Authenticate a user and obtain JWT tokens.
- logout: Log out the authenticated user.
- token/refresh: Refresh JWT access tokens.

The app namespace is set to 'users' for namespacing URL names in Django.
"""


app_name = 'users'

urlpatterns = [
    path('user-detail', UserDetailView.as_view(), name='user-detail'),
    path('send-code/', SendCodeView.as_view(), name='send-code'),
    path('verify-code/', VerifyCodeView.as_view(), name='verify-code'),
    path('google-login/', GoogleLogin.as_view(), name='google-login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
