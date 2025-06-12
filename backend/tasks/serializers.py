from rest_framework import serializers
from .models import Task

"""
In this module, we define the serializers for Tasks
"""


class TaskSerializer(serializers.ModelSerializer):

    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']


    def get_created_at(self, obj):
        return obj.created_at.strftime("%b %d, %Y - %I:%M %p")