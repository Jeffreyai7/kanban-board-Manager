from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from ..models import VerificationCode

User = get_user_model()

class TestUsers(APITestCase):
    def setUp(self):
        self.register_url = reverse('rest_register')
        self.login_url = reverse('rest_login')
        self.user_data = {
            'fname': 'Test',
            'lname': 'User',
            'email': 'test@example.com',
            'password1': 'StrongPass123!',
            'password2': 'StrongPass123!',
        }
        self.send_code_url = reverse('users:send-code')
        self.verify_code_url = reverse('users:verify-code')
        self.user_detail_url = reverse('users:user-detail')

    def test_user_registration(self):
        response = self.client.post(self.register_url, self.user_data)
        print("Registration Response", response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email='test@example.com').exists())

    def test_user_login(self):
        self.client.post(self.register_url, self.user_data)
        login_data = {
            'email': 'test@example.com',
            'password': 'StrongPass123!',
        }
        response = self.client.post(self.login_url, login_data)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_send_code_email(self):
        user = User.objects.create_user(email='code@example.com', password='pass1234')
        data = {'user_id': user.id, 'purpose': 'email'}
        response = self.client.post(self.send_code_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(VerificationCode.objects.filter(user=user, purpose='email').exists())

    def test_send_code_invalid_user(self):
        data = {'user_id': 9999, 'purpose': 'email'}
        response = self.client.post(self.send_code_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('user_id', response.data)

    def test_verify_code_success(self):
        user = User.objects.create_user(email='verify@example.com', password='pass1234')
        code_obj = VerificationCode.objects.create(user=user, purpose='email')
        data = {
            'user_id': user.id,
            'purpose': 'email',
            'code': str(code_obj.code)
        }
        response = self.client.post(self.verify_code_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertTrue(user.is_email_verified)

    def test_verify_code_invalid(self):
        user = User.objects.create_user(email='invalid@example.com', password='pass1234')
        data = {
            'user_id': user.id,
            'purpose': 'email',
            'code': '00000000-0000-0000-0000-000000000000'
        }
        response = self.client.post(self.verify_code_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response.data)

    def test_user_detail_authenticated(self):
        self.client.post(self.register_url, self.user_data)
        login_data = {'email': 'test@example.com', 'password': 'StrongPass123!'}
        login_response = self.client.post(self.login_url, login_data)
        token = login_response.data.get('access')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(self.user_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@example.com')

    def test_user_detail_unauthenticated(self):
        response = self.client.get(self.user_detail_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)