from rest_framework import serializers
from .models import Task

"""
In this module, we define the serializers for Tasks
"""


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']
