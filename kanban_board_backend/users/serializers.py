from rest_framework import serializers
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from .models import VerificationCode, CustomUser


User = get_user_model()


class CustomRegisterSerializer(RegisterSerializer):
    fName = serializers.CharField(required=True)
    lName = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    phone_number = serializers.CharField(required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('username', None)
        raise Exception("SERIALIZER FILE IS LOADED")

    def get_fields(self):
        fields = super().get_fields()
        fields.pop('username', None)
        return fields

    def get_cleaned_data(self):
         return {
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'fName': self.validated_data.get('fName', ''),
            'lName': self.validated_data.get('lName', ''),
            'phone_number': self.validated_data.get('phone_number', ''),
        }
    
    def save(self, request):
        print("CustomRegisterSerializer is being used!")
        user = super().save(request)
        user.fName = self.validated_data.get('fName', '')
        user.lName = self.validated_data.get('lName', '')
        user.phone_number = self.validated_data.get('phone_number', '')
        user.save()
        print("CustomRegisterSerializer is being used!")
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
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


class CustomLoginSerializer(LoginSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, attrs):
        return super().validate(attrs)