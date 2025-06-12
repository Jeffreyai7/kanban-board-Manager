from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from tasks.models import Task
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class TaskTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='testuser@example.com', password='StrongPass123!')
        self.other_user = User.objects.create_user(email='other@example.com', password='OtherPass123!')

        # Get JWT token for self.user
        refresh = RefreshToken.for_user(self.user)
        access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        self.task_list_create_url = reverse('tasks:task-list-create')

    def test_create_task(self):
        data = {
            'title': 'Test Task',
            'description': 'Test Description',
            'status': 'To-do'
        }
        response = self.client.post(self.task_list_create_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.first().title, 'Test Task')

    def test_list_tasks_only_user_tasks(self):
        Task.objects.create(user=self.user, title='Task 1', description='Desc 1')
        Task.objects.create(user=self.user, title='Task 2', description='Desc 2')
        Task.objects.create(user=self.other_user, title='Other Task', description='Not mine')

        response = self.client.get(self.task_list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertTrue(all(task['title'] != 'Other Task' for task in response.data))

    def test_retrieve_task(self):
        task = Task.objects.create(user=self.user, title='My Task', description='Read me')
        url = reverse('tasks:task-detail', args=[task.id])  # e.g. /tasks/<id>/
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'My Task')

    def test_retrieve_other_users_task_forbidden(self):
        task = Task.objects.create(user=self.other_user, title='Their Task', description='Private')
        url = reverse('tasks:task-detail', args=[task.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_task(self):
        task = Task.objects.create(user=self.user, title='Old Title', description='Old')
        url = reverse('tasks:task-detail', args=[task.id])
        response = self.client.put(url, {
            'title': 'New Title',
            'description': 'Updated desc',
            'status': 'In-progress'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        task.refresh_from_db()
        self.assertEqual(task.title, 'New Title')

    def test_delete_task(self):
        task = Task.objects.create(user=self.user, title='To Delete')
        url = reverse('tasks:task-detail', args=[task.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Task.objects.filter(id=task.id).exists())

    def test_search_tasks_by_title_and_description(self):
        Task.objects.create(user=self.user, title='Buy Milk', description='Groceries')
        Task.objects.create(user=self.user, title='Workout', description='Gym stuff')

        response = self.client.get(f"{self.task_list_create_url}?search=milk")
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Buy Milk')

        response = self.client.get(f"{self.task_list_create_url}?search=gym")
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Workout')
