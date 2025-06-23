from rest_framework import serializers
from .models import Task

"""
serializers.py

This module defines the serializer for the Task model used in the Kanban Board Manager backend.
It leverages Django REST Framework's ModelSerializer to convert Task model instances to and from JSON representations.

Classes:
    TaskSerializer: Serializes and deserializes Task instances, including a custom formatted 'created_at' field.

Fields:
    - All fields from the Task model are included.
    - 'id', 'user', and 'created_at' are read-only.
    - 'created_at' is formatted as "Mon DD, YYYY - HH:MM AM/PM".

Usage:
    Used by views to validate and serialize Task data for API responses and requests.
"""



class TaskSerializer(serializers.ModelSerializer):

    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']


    def get_created_at(self, obj):
        return obj.created_at.strftime("%b %d, %Y - %I:%M %p")