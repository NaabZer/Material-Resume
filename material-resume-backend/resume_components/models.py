from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Component(models.Model):
    class ComponentTypes(models.TextChoices):
        CARD = 'C_CARD', _('Card Component')
    component_type = models.CharField(
        max_length=32,
        choices=ComponentTypes.choices
    )
    col = models.IntegerField(default=0)
    row = models.IntegerField(default=0)
    width = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    inside_grid = models.ForeignKey('self', on_delete=models.CASCADE,
                                    blank=True, null=True)

    def __str__(self):
        return self.component_type + "(" +\
                ', '.join(map(str, [self.row, self.col,
                                    self.width, self.height])) + ")"


class SettingsRow(models.Model):
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    setting = models.CharField(max_length=64)
    value = models.CharField(max_length=64)
