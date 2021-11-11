from django.contrib.auth import authenticate
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import User
from resume_entries.serializers import LanguageSerializer


class UserSerializer(serializers.ModelSerializer):
    languages = LanguageSerializer(many=True)

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

        return user


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
