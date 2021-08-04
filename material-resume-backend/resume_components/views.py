from rest_framework import viewsets
from .models import Resume, Page, Component, SettingsRow
from .serializers import ResumeSerializer, ResumeListSerializer, PageSerializer
from .serializers import ComponentSerializer, SettingsRowSerializer
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


class ComponentViewSet(viewsets.ModelViewSet):
    serializer_class = ComponentSerializer
    permission_classes = [IsResumeOwner]

    def get_queryset(self):
        user = self.request.user
        if(not user.id):
            return None
        return Component.objects.all()


class SettingsRowViewSet(viewsets.ModelViewSet):
    serializer_class = SettingsRowSerializer
    permission_classes = [IsResumeOwner]

    def get_queryset(self):
        user = self.request.user
        if(not user.id):
            return None
        return SettingsRow.objects.all()
