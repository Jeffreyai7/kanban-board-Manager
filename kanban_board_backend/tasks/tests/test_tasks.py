from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from tasks.models import Task

User = get_user_model()

class TaskTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='StrongPass123!')
        self.client.login(username='testuser', password='StrongPass123!')
        self.task_list_create_url = reverse('task-list-create')  # URL for listing and creating tasks

    def test_create_task(self):
        data = {'title': 'Test Task', 'description': 'Test Description'}
        response = self.client.post(self.task_list_create_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'Test Task')

    def test_list_tasks(self):
        Task.objects.create(user=self.user, title='Task 1', description='Desc 1')
        Task.objects.create(user=self.user, title='Task 2', description='Desc 2')
        response = self.client.get(self.task_list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)