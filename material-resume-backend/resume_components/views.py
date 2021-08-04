from rest_framework import viewsets
from .models import Resume, Page
from .serializers import ResumeSerializer, ResumeListSerializer, PageSerializer
from material_resume_backend.permissions import IsOwner
from .permissions import IsResumeOwner


class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [IsResumeOwner]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if(not user.id):
            return None
        return Resume.objects.filter(owner=user)


class ResumeListViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeListSerializer
    permission_classes = [IsResumeOwner]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if(not user.id):
            return None
        return Resume.objects.filter(owner=user)


class PageViewSet(viewsets.ModelViewSet):
    serializer_class = PageSerializer
    permission_classes = [IsResumeOwner]

    def get_queryset(self):
        user = self.request.user
        if(not user.id):
            return None
        return Page.objects.all()
