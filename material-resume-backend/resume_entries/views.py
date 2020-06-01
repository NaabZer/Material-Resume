from rest_framework import viewsets
from .models import Experience, Text
from .serializers import ExperienceSerializer, TextSerializer
from material_resume_backend.permissions import IsOwner

# Create your views here.


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsOwner]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TextViewSet(viewsets.ModelViewSet):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    permission_classes = [IsOwner]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
