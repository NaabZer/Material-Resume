from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ResumeViewSet, ResumeListViewSet

resume_list = ResumeListViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

resume_detail = ResumeViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    path('resume', resume_list, name='resume-list'),
    path('resume/<int:resume_id>', resume_detail, name='resume-detail')
])
