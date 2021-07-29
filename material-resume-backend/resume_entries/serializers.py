from rest_framework import serializers
from .models import Experience, ExperienceEntry, Text, TextEntry


class ExperienceEntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ExperienceEntry
        fields = ['id', 'lang', 'title', 'location', 'description']


class ExperienceSerializer(serializers.HyperlinkedModelSerializer):
    entries = ExperienceEntrySerializer(many=True)

    class Meta:
        model = Experience
        fields = ['url', 'id', 'start', 'end', 'entries']

    def create(self, validated_data):
        entries_data = validated_data.pop('entries')
        experience = Experience.objects.create(**validated_data)

        entries_list = []
        for entry_data in entries_data:
            entry = ExperienceEntry.objects.create(
                    experience=experience,
                    **entry_data
                    )
            entries_list.append(entry)
        experience.entries.set(entries_list)
        experience.save()

        return experience


class TextEntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TextEntry
        fields = ['id', 'lang', 'text']


class TextSerializer(serializers.HyperlinkedModelSerializer):
    entries = TextEntrySerializer(many=True)

    class Meta:
        model = Text
        fields = ['url', 'id', 'entries']

    def create(self, validated_data):
        entries_data = validated_data.pop('entries')
        text_obj = Text.objects.create(**validated_data)

        entries_list = []
        for entry_data in entries_data:
            entry = TextEntry.objects.create(
                    text_obj=text_obj,
                    **entry_data
                    )
            entries_list.append(entry)
        text_obj.entries.set(entries_list)
        text_obj.save()

        return text_obj
