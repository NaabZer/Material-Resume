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
from material_resume_backend import views as core_views

user_detail = core_views.UserViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = [
    # path('api/login/', core_views.login_view, name='api-login'),
    path('api/signup', core_views.SignupViewSet.as_view(),
         name='api-signup'),
    path('api/login', core_views.login_view,
         name='api-login'),
    path('api/logout', core_views.LogoutView.as_view(),
         name='api-logout'),
    path('api/user', core_views.GetUser.as_view(),
         name='api-user'),
    path('admin/', admin.site.urls),
    path('api/user/<email>', user_detail, name='api-user-detail'),
    path('api/components/', include('resume_components.urls')),
    path('api/entries/', include('resume_entries.urls')),
    path('api/csrf/', core_views.get_csrf, name='api-csrf'),
    path('api/api-auth/', include('rest_framework.urls')),
]
