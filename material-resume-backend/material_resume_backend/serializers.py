from django.contrib.auth import authenticate
from django.core import exceptions
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name']


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
