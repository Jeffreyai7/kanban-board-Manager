from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import VerificationCode
from .serializers import SendCodeSerializer, VerifyCodeSerializer, UserDetailSerializer
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings



User = get_user_model()

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
        # mark verified
        if code_obj.purpose == 'email':
            code_obj.user.is_email_verified = True
        else:
            code_obj.user.is_phone_verified = True
        code_obj.user.save()
        return Response({"detail": "Verified"}, status=status.HTTP_200_OK)



class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:8000"  # or your frontend URL
    client_class = OAuth2Client