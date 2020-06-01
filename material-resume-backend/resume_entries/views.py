from rest_framework import viewsets
from .models import Experience, Text
from .serializers import ExperienceSerializer, TextSerializer

# Create your views here.


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class TextViewSet(viewsets.ModelViewSet):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
