from rest_framework import serializers
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from .models import VerificationCode, User
from django.conf import settings


User = get_user_model()


class CustomRegisterSerializer(RegisterSerializer):
    fname = serializers.CharField(required=True)
    lname = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    phone_number = serializers.CharField(required=False)
    username = None

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data.pop('username', None)
        data['fname'] = self.validated_data.get('fname', '')
        data['lname'] = self.validated_data.get('lname', '')
        data['phone_number'] = self.validated_data.get('phone_number', '')
        return data
    
    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get('fname', '')
        user.last_name = self.validated_data.get('lname', '')
        user.phone_number = self.validated_data.get('phone_number', '')
        user.save()
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email','phone_number',
                  'is_email_verified','is_phone_verified')
        
class SendCodeSerializer(serializers.ModelSerializer):
    purpose = serializers.ChoiceField(choices=VerificationCode.PURPOSE_CHOICES)
    user_id = serializers.IntegerField()

    class Meta:
        model = VerificationCode
        fields = ('user_id', 'purpose')

    def create(self, validated_data):
        try:
            user = User.objects.get(pk=validated_data['user_id'])
        except User.DoesNotExist:
            raise serializers.ValidationError({'user_id': 'User with this ID does not exist.'})
        # delete any old codes for the same purpose
        VerificationCode.objects.filter(user=user, purpose=validated_data['purpose']).delete()
        return VerificationCode.objects.create(user=user, purpose=validated_data['purpose'])
    
    
class VerifyCodeSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    code = serializers.UUIDField()
    purpose = serializers.ChoiceField(choices=VerificationCode.PURPOSE_CHOICES)


class CustomLoginSerializer(LoginSerializer):
    username = None
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, attrs):
        return super().validate(attrs)