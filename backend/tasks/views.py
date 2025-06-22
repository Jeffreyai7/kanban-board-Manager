from rest_framework import generics, permissions, filters
from .models import Task
from .serializers import TaskSerializer


"""
tasks/views.py

This module defines API views for managing Task objects in the Kanban Board Manager backend.
It uses Django REST Framework's generic views to provide endpoints for listing, creating,
retrieving, updating, and deleting tasks. All endpoints require authentication.

Classes:
    IsOwner: Custom permission to ensure only the owner of a task can access or modify it.
    TaskListCreateView: API view for listing and creating tasks belonging to the authenticated user.
    TaskRetrieveUpdateDestroyView: API view for retrieving, updating, or deleting a specific task,
        ensuring the user is the owner.

Features:
    - Only authenticated users can access these endpoints.
    - Users can only interact with their own tasks.
    - Supports searching tasks by title and description.
"""

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)