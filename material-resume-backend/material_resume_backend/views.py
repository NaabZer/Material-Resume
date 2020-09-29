from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from django.http import HttpResponse

from material_resume_backend.forms import SignUpForm


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
