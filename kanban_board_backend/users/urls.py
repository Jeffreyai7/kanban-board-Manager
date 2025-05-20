from django.urls import path
from .views import UserDetailView, SendCodeView, VerifyCodeView, GoogleLogin


urlpatterns = [
    path('', UserDetailView.as_view(), name='user-detail'),
    path('users/send-code/', SendCodeView.as_view(), name='send-code'),
    path('users/verify-code/', VerifyCodeView.as_view(), name='verify-code'),
    path('users/google/', GoogleLogin.as_view(), name='google_login'),
]