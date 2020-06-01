from django.urls import path
from . import views

urlpatterns = [
        path('experiences/', views.experience_list),
    ]
