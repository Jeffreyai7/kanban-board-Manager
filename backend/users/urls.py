from django.urls import path
from .views import LoginView, LogoutView, RegisterView, UserDetailView, SendCodeView, VerifyCodeView, GoogleLogin
from rest_framework_simplejwt.views import TokenRefreshView



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
