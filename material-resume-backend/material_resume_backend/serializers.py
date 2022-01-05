from django.contrib.auth import authenticate
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import User, Language
from resume_entries.models import ExperienceEntry, TextEntry


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['language']


class UserSerializer(serializers.ModelSerializer):
    languages = LanguageSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'setting_page_theme',
                  'setting_override_theme', 'password', 'languages']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        en_lang = Language.objects.get(language='en')
        user.languages.add(en_lang)

        return user

    def update(self, instance, validated_data):
        languages_data = validated_data.pop('languages')

        # Check for new languages, add empty entries for each new lang
        for lang_data in languages_data:
            lang_str = lang_data.get('language')

            lang_exists = instance.languages.filter(language=lang_str).exists()
            if lang_exists:
                print("{} exists".format(lang_str))
                # Do nothing if user alreadu has language
                continue

            # Add language to user
            lang = Language.objects.filter(
                    language=lang_data.get('language')).first()
            if lang:
                instance.languages.add(lang)
            else:
                new_lang = Language.objects.create(
                        language=lang_data.get('language'))
                instance.languages.add(new_lang)

            # Add empy experience entries for new language
            for exp in instance.experiences.all():
                entry = ExperienceEntry.objects.create(
                        experience=exp,
                        lang=lang
                    )
                print('exp added')
                print(entry)
                exp.entries.add(entry)

            # Add empy text entries for new language
            for text in instance.texts.all():
                entry = TextEntry.objects.create(
                        text_obj=text,
                        lang=lang
                    )
                print('text added')
                print(entry)
                text.entries.add(entry)

        # Check if old language has been deleted
        to_remove = []
        lang_data = [lang.get('language') for lang in languages_data]
        for lang in instance.languages.all():
            if lang.language not in lang_data:
                print("Removing {}".format(lang.language))
                to_remove.append(lang)

        for remove_lang in to_remove:
            instance.languages.remove(remove_lang)

        return super(UserSerializer, self).update(instance,
                                                  validated_data)


class AuthCustomTokenSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            # Check if user sent email

            user = authenticate(email=email, password=password)
            print(user)

            if user:
                if not user.is_active:
                    msg = 'User account is disabled.'
                    raise exceptions.ValidationError(msg)
            else:
                msg = 'Unable to log in with provided credentials.'
                raise exceptions.ValidationError(msg)
        else:
            msg = 'Must include "email" and "password"'
            raise exceptions.ValidationError(msg)

        attrs['user'] = user
        return attrs
