from rest_framework import viewsets
from .models import Experience, Text
from .serializers import ExperienceSerializer, TextSerializer
from material_resume_backend.permissions import IsOwner

# Create your views here.


class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [IsOwner]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if(not user.id):
            return None
        return Experience.objects.filter(owner=user)


class TextViewSet(viewsets.ModelViewSet):
    serializer_class = TextSerializer
    permission_classes = [IsOwner]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if(not user.id):
            return None
        return Text.objects.filter(owner=user)
