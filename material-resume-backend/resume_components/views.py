from rest_framework import viewsets
from .models import Resume
from .serializers import ResumeSerializer
from material_resume_backend.permissions import IsOwner


class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [IsOwner]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if(not user.id):
            return None
        return Resume.objects.filter(owner=user)
