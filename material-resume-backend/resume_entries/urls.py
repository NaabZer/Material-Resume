from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ExperienceViewSet, TextViewSet

experience_list = ExperienceViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

experience_detail = ExperienceViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

text_list = TextViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

text_detail = TextViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    path('experiences/', experience_list, name='experience-list'),
    path('experiences/<int:pk>', experience_detail,
         name='experience-detail'),
    path('texts/', text_list, name='text-list'),
    path('texts/<int:pk>', text_detail, name='text-detail')
])
