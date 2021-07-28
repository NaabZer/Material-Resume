"""material_resume_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.urls import include, path
from rest_framework.authtoken import views
from material_resume_backend import views as core_views
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('components/', include('resume_components.urls')),
    path('entries/', include('resume_entries.urls')),
    path('admin/', admin.site.urls),
    path('api-token-auth/', core_views.ObtainAuthToken.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('user/', core_views.GetUser.as_view()),
    path('user/signup', core_views.SignupViewSet.as_view(), name='signup'),
]
