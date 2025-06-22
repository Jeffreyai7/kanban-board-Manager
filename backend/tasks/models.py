from django.db import models
from django.conf import settings


"""
This module defines the Task model for the Kanban Board Manager backend application.

Classes:
    Task: Represents a task in the Kanban board, with fields for title, subheading, 
          description, status, assigned user, priority, and creation timestamp.

Task Model Fields:
    - title (CharField): The main title of the task.
    - subheading (CharField): An optional subheading for additional context.
    - description (TextField): An optional detailed description of the task.
    - status (CharField): The current status of the task, with choices: 'To-do', 'In-progress', 'In-review', 'Done'.
    - user (ForeignKey): Reference to the user assigned to the task.
    - priority (CharField): The priority level of the task, with choices: 'Low', 'Medium', 'High'.
    - created_at (DateTimeField): Timestamp indicating when the task was created.

The Task model includes a string representation method that returns the task's title.
"""


class Task(models.Model):
    STATUS_CHOICES = [
        ('To-do', 'To-do'),
        ('In-progress', 'In-progress'),
        ('In-review', 'In-review'),
        ('Done', 'Done'),
    ]

    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    title = models.CharField(max_length=255)
    subheading = models.CharField(max_length=255, blank=True)
    description= models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='To-do')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='Medium')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title