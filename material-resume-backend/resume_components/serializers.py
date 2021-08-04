from rest_framework import serializers
from .models import Resume, Page, Component, SettingsRow


class PageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Page
        fields = ['url', 'resume', 'id', 'page_num']


class ResumeSerializer(serializers.HyperlinkedModelSerializer):
    pages = PageSerializer(many=True)

    class Meta:
        model = Resume
        fields = ['url', 'id', 'name', 'pages']


class ResumeListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Resume
        fields = ['url', 'id', 'name']
