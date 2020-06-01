# from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from itertools import chain
from .models import Resume


# Create your views here.


def index(request):
    return HttpResponse("hi, hello")


def resume(request, resume_id):
    res = Resume.objects.get(pk=resume_id)
    pages = res.pages.all()
    components = res.components.all()
    obj = {
            'name': res.name,
            'pages': [-1 * p.page_num for p in pages],
            'components': {
                c.id: {
                    'id': c.id,
                    'componentType': c.component_type,
                    'containerId': -1 * c.inside_page.page_num
                    if getattr(c, 'inside_page', False)
                    else c.inside_component.id,
                    'col': c.col,
                    'row': c.row,
                    'width': c.width,
                    'height': c.height
                } for c in components
            },
            'componentSettings': {
                -1 * c.page_num if getattr(c, 'page_num', False) else c.id: {
                    s.setting: s.value for s in c.settings.all()
                } for c in list(chain(pages, components))
            },
            'grids': {
                -1 * c.page_num if getattr(c, 'page_num', False) else c.id: [
                    cc.id for cc in c.child_components.all()
                ] for c in list(chain(pages, components))
                if len(c.child_components.all()) > 0
            }
        }
    return JsonResponse(obj)
