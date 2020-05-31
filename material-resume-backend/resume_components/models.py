from django.db import models

# Create your models here.


class Component(models.Model):
    component_type = models.CharField(max_length=32)
    col = models.IntegerField(default=0)
    row = models.IntegerField(default=0)
    width = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    inside_grid = models.ForeignKey('self', on_delete=models.CASCADE,
                                    blank=True, null=True)


class SettingsRow(models.Model):
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    setting = models.CharField(max_length=64)
    value = models.CharField(max_length=64)
