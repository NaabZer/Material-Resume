from rest_framework import permissions
from .models import Page, Resume, Component


def is_resume_owner(obj, user):
    return obj.owner == user


def is_page_owner(obj, user):
    return obj.resume.owner == user


def is_component_owner(obj, user):
    # Components can be nested, so we need a loop to check ownership
    last_parent = obj
    parent = obj.inside_component
    while(parent):
        last_parent = parent
        parent = parent.inside_component
    return last_parent.inside_page.resume.owner == user


class IsResumeOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if(isinstance(obj, Resume)):
            return is_resume_owner(obj, request.user)
        if(isinstance(obj, Page)):
            return is_page_owner(obj, request.user)
        if(isinstance(obj, Component)):
            return is_component_owner(obj, request.user)

        return False
