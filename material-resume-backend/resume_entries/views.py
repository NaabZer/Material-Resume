from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Experience, ExperienceEntry
from .serializers import ExperienceSerializer

# Create your views here.


@csrf_exempt
def experience_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        experiences = Experience.objects.all()
        serializer = ExperienceSerializer(experiences, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ExperienceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
