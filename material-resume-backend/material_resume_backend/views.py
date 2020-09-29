from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from material_resume_backend.forms import SignUpForm
from material_resume_backend.serializers import UserSerializer


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        print("hello")
        print(form.errors.as_data())
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({'token': token.key})
        else:
            return JsonResponse(form.errors.get_json_data(), status=400)


class GetUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
