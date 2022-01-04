from rest_framework import serializers
from .models import Experience, ExperienceEntry, Text, TextEntry
from material_resume_backend.serializers import LanguageSerializer
from material_resume_backend.models import Language


class ExperienceEntrySerializer(serializers.HyperlinkedModelSerializer):
    lang = LanguageSerializer(required=True)

    class Meta:
        model = ExperienceEntry
        fields = ['id', 'lang', 'title', 'location', 'description']

    def update(self, instance, validated_data):
        # Language will never change in an entry update
        _ = validated_data.pop('lang')

        return super(ExperienceEntrySerializer, self).update(instance,
                                                             validated_data)


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
            lang_data = entry_data.pop('lang')
            lang, created = Language.objects.get_or_create(
                    language=lang_data.get('language')
                    )
            entry_data['lang'] = lang
            entry = ExperienceEntry.objects.create(
                    experience=experience,
                    **entry_data
                    )
            entries_list.append(entry)
        experience.entries.set(entries_list)
        experience.save()

        return experience

    def update(self, instance, validated_data):
        entries_data = validated_data.pop('entries')

        for entry_data in entries_data:
            lang = Language.objects.get(
                    language=entry_data.get('lang').get('language')
                    )
            entry = ExperienceEntry.objects.get(lang=lang, experience=instance)
            ExperienceEntrySerializer().update(entry, entry_data)

        return super(ExperienceSerializer, self).update(instance,
                                                        validated_data)


class TextEntrySerializer(serializers.HyperlinkedModelSerializer):
    lang = LanguageSerializer(required=True)

    class Meta:
        model = TextEntry
        fields = ['id', 'lang', 'text']

    def update(self, instance, validated_data):
        # Language will never change in an entry update
        _ = validated_data.pop('lang')

        return super(TextEntrySerializer, self).update(instance,
                                                       validated_data)


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
            lang_data = entry_data.pop('lang')
            lang, created = Language.objects.get_or_create(
                    language=lang_data.get('language')
                    )
            entry_data['lang'] = lang

            entry = TextEntry.objects.create(
                    text_obj=text_obj,
                    **entry_data
                    )
            entries_list.append(entry)
        text_obj.entries.set(entries_list)
        text_obj.save()

        return text_obj

    def update(self, instance, validated_data):
        entries_data = validated_data.pop('entries')

        for entry_data in entries_data:
            lang = Language.objects.get(
                    language=entry_data.get('lang').get('language')
                    )
            entry = TextEntry.objects.get(lang=lang, text_obj=instance)
            TextEntrySerializer().update(entry, entry_data)

        return super(TextSerializer, self).update(instance, validated_data)
