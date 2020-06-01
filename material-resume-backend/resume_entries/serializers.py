from rest_framework import serializers
from .models import Experience, ExperienceEntry, Text, TextEntry


class ExperienceEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceEntry
        fields = ['id', 'lang', 'title', 'location',
                  'start', 'end', 'description']


class ExperienceSerializer(serializers.ModelSerializer):
    entries = ExperienceEntrySerializer(many=True)

    class Meta:
        model = Experience
        fields = ['id', 'entries']


class TextEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TextEntry
        fields = ['id', 'lang', 'text']


class TextSerializer(serializers.ModelSerializer):
    entries = ExperienceEntrySerializer(many=True)

    class Meta:
        model = Text
        fields = ['id', 'entries']
