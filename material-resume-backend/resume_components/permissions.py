from rest_framework import permissions
from .models import Page, Resume


class IsResumeOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if(isinstance(obj, Resume)):
            return obj.owner == request.user
        if(isinstance(obj, Page)):
            return obj.resume.owner == request.user

        return False
