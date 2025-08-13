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
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


"""
This module defines the URL routing configuration for the kanban_backend Django project.

It includes the following routes:
- The Django admin interface at '/admin/'.
- API endpoints for the 'tasks' app under '/api/' using the 'tasks' namespace.
- API endpoints for the 'users' app under '/api/' using the 'users' namespace.

Each included app should define its own URL patterns and use the provided namespace for reverse URL resolution.

For more information, see:
https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""


"""
This module defines the URL routing configuration for the kanban_backend Django project.

It includes the following routes:
- The Django admin interface at '/admin/'.
- API endpoints for the 'tasks' app under '/api/' using the 'tasks' namespace.
- API endpoints for the 'users' app under '/api/' using the 'users' namespace.

Each included app should define its own URL patterns and use the provided namespace for reverse URL resolution.

For more information, see:
https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('tasks.urls', namespace='tasks')),
    path('api/v1/', include('users.urls', namespace='users')),


    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]


