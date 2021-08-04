from rest_framework import serializers
from .models import Resume, Page, Component, SettingsRow


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class ComponentSerializer(serializers.HyperlinkedModelSerializer):
    child_components = RecursiveField(many=True)

    class Meta:
        model = Component
        fields = ['id', 'url', 'inside_page', 'inside_component',
                  'component_type', 'row', 'col', 'height', 'width',
                  'child_components']


class PageSerializer(serializers.HyperlinkedModelSerializer):
    child_components = ComponentSerializer(many=True)

    class Meta:
        model = Page
        fields = ['id', 'url', 'resume', 'page_num', 'child_components']


class ResumeSerializer(serializers.HyperlinkedModelSerializer):
    pages = PageSerializer(many=True)

    class Meta:
        model = Resume
        fields = ['id', 'url', 'name', 'pages']


class ResumeListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'url', 'name']
