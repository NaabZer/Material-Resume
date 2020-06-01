from rest_framework import serializers
from .models import Experience, ExperienceEntry, Text, TextEntry


class ExperienceEntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ExperienceEntry
        fields = ['id', 'lang', 'title', 'location',
                  'start', 'end', 'description']


class ExperienceSerializer(serializers.HyperlinkedModelSerializer):
    entries = ExperienceEntrySerializer(many=True)

    class Meta:
        model = Experience
        fields = ['url', 'id', 'entries']


class TextEntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TextEntry
        fields = ['id', 'lang', 'text']


class TextSerializer(serializers.HyperlinkedModelSerializer):
    entries = ExperienceEntrySerializer(many=True)

    class Meta:
        model = Text
        fields = ['url', 'id', 'entries']
