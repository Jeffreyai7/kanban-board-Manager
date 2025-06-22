from django.urls import path
from . views import TaskListCreateView, TaskRetrieveUpdateDestroyView


"""
urls.py

This module defines the URL patterns for the 'tasks' app in the Kanban Board Manager project.

- It imports Django's `path` function for URL routing.
- It imports two class-based views: `TaskListCreateView` for listing and creating tasks, and `TaskRetrieveUpdateDestroyView` for retrieving, updating, and deleting individual tasks.

URL Patterns:
- 'tasks/': Maps to `TaskListCreateView` for listing all tasks or creating a new task.
- 'tasks/<int:pk>/': Maps to `TaskRetrieveUpdateDestroyView` for retrieving, updating, or deleting a specific task by its primary key.

The `app_name` variable is set to 'tasks' for namespacing these URLs.

Endpoints:
- GET    /tasks/           : List all tasks.
- POST   /tasks/           : Create a new task.
- GET    /tasks/<int:pk>/  : Retrieve a specific task by its primary key.
- PUT    /tasks/<int:pk>/  : Update a specific task by its primary key.
- PATCH  /tasks/<int:pk>/  : Partially update a specific task by its primary key.
- DELETE /tasks/<int:pk>/  : Delete a specific task by its primary key.
"""

app_name = 'tasks'

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroyView.as_view(), name='task-detail'),
]