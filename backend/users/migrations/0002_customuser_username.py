# Generated by Django 5.2.1 on 2025-05-27 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='username',
            field=models.CharField(blank=True, max_length=30, null=True, unique=True),
        ),
    ]
