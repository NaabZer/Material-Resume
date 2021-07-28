from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from material_resume_backend.forms import SignUpForm
from material_resume_backend.serializers import (
        UserSerializer,
        AuthCustomTokenSerializer
        )


class SignupViewSet(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Create user
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Get token
        email = serializer.validated_data['email']
        raw_password = serializer.validated_data['password']
        user = authenticate(email=email, password=raw_password)
        token, _ = Token.objects.get_or_create(user=user)
        content = {
            'token': token.key,
        }

        return Response(content)


class GetUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class ObtainAuthToken(APIView):
    def post(self, request):
        serializer = AuthCustomTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        content = {
            'token': token.key,
        }

        return Response(content)
