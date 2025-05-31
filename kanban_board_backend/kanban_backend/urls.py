"""
URL configuration for kanban_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('api/', include('tasks.urls', namespace='tasks')),
     path('api/', include('users.urls', namespace='users')),
=======
    path('api/tasks', include('tasks.urls', namespace='tasks')),
     path('api/users/', include('users.urls', namespace='users')),
    path('api/auth/', include('dj_rest_auth.urls', )),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls', )),
>>>>>>> bb038f94e59e16919964d3b7f0ece63927a7cd0d
   
]
