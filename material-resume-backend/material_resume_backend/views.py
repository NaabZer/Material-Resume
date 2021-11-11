import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from django.views.decorators.http import require_POST
from material_resume_backend.permissions import IsUser
from material_resume_backend.models import User, Language
from material_resume_backend.serializers import UserSerializer


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


class SignupViewSet(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Create user
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        email = serializer.validated_data['email']
        raw_password = serializer.validated_data['password']
        user = authenticate(email=email, password=raw_password)
        login(request, user)

        return JsonResponse({'detail': 'Successfully logged in.'})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsUser]
    lookup_field = 'email'


class GetUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


@require_POST
def login_view(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        return JsonResponse(
                {'detail': 'Please provide username and password.'},
                status=400)

    user = authenticate(email=email, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        logout(request)
        return JsonResponse({'detail': 'Successfully logged out.'})
