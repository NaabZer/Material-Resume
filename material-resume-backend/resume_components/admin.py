from django.contrib import admin

from .models import Resume, Page, Component, SettingsRow

# Register your models here.
admin.site.register(Resume)
admin.site.register(Page)
admin.site.register(Component)
admin.site.register(SettingsRow)
