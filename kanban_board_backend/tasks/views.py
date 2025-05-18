from rest_framework import generics, permissions, filters
from .models import Task
from .serializers import TaskSerializer

"""
In this module, we define the views for the Task model.
We use Django REST Framework's generic views to create a simple API for our tasks.
"""


class TaskListCreateView(generics.ListCreateAPIView):
    """
    API's for creating tasks, searching tasks by title and listing all tasks
    """

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

    def get_queryset(self):
        """
        This method returns the tasks created by the authenticated user.
        """
        user = self.request.user
        return Task.objects.filter(user=user)
    
    def perform_create(self, serializer):
        """
        This method saves the task with the authenticated user as the owner.
        """
        serializer.save(user=self.request.user)

class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API's for updating tasks, deleting tasks and retrieving a single task
    """

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This method returns the tasks created by the authenticated user.
        """
        user = self.request.user
        return Task.objects.filter(user=user)