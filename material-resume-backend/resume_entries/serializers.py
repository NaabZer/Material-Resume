from rest_framework import serializers
from .models import Experience, ExperienceEntry, Text, TextEntry


class ExperienceEntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ExperienceEntry
        fields = ['id', 'lang', 'title', 'location',
                  'start', 'end', 'description']


class ExperienceSerializer(serializers.HyperlinkedModelSerializer):
    entries = ExperienceEntrySerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = ['url', 'id', 'entries']

    def create(self, validated_data):
        experience = Experience.objects.create(**validated_data)

        owner_langs = validated_data['owner'].languages.all()
        entries_list = []
        for language in owner_langs:
            entry = ExperienceEntry.objects.create(
                    lang=language.language,
                    experience=experience
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
    entries = TextEntrySerializer(many=True, read_only=True)

    class Meta:
        model = Text
        fields = ['url', 'id', 'entries']

    def create(self, validated_data):
        text = Text.objects.create(**validated_data)

        owner_langs = validated_data['owner'].languages.all()
        entries_list = []
        for language in owner_langs:
            entry = TextEntry.objects.create(
                    lang=language.language,
                    text_obj=text
                    )
            entries_list.append(entry)
        text.entries.set(entries_list)
        text.save()

        return text
