from django.db import models
from django.conf import settings

"""
In this module, The neccessary fields needed for the tasks are defined and created.
"""


class Task(models.Model):
    STATUS_CHOICES = [
        ('To-do', 'To-do'),
        ('In-progress', 'In-progress'),
        ('In-review', 'In-review'),
        ('Done', 'Done'),
    ]

    title = models.CharField(max_length=255)
    subheading = models.CharField(max_length=255, blank=True)
    description= models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='To-do')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title