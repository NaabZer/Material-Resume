from django.contrib import admin

# Register your models here.

from .models import Experience, ExperienceEntry, Text, TextEntry

# Register your models here.
admin.site.register(Experience)
admin.site.register(ExperienceEntry)
admin.site.register(Text)
admin.site.register(TextEntry)
