from django.urls import path
from .views import UserDetailView, SendCodeView, VerifyCodeView, GoogleLogin


app_name = 'users'

urlpatterns = [
    path('', UserDetailView.as_view(), name='user-detail'),
    path('send-code/', SendCodeView.as_view(), name='send-code'),
    path('verify-code/', VerifyCodeView.as_view(), name='verify-code'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
]