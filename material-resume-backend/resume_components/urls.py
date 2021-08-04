from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ResumeViewSet, ResumeListViewSet, PageViewSet

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

page_list = PageViewSet.as_view({
    'post': 'create',
})

page_detail = PageViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    path('resume', resume_list, name='resume-list'),
    path('resume/<int:pk>', resume_detail, name='resume-detail'),
    path('page', page_list, name='page-list'),
    path('page/<int:pk>', page_detail, name='page-detail'),
])
