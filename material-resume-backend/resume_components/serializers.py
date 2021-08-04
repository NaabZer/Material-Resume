from rest_framework import serializers
from .models import Resume, Page, Component, SettingsRow


class ResumeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'name', 'pages']


class ResumeListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'name']
