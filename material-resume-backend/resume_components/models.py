from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

# Create your models here.


class Resume(models.Model):
    name = models.CharField(max_length=32)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              related_name='resumes',
                              on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Page(models.Model):
    resume = models.ForeignKey(Resume, related_name='pages',
                               on_delete=models.CASCADE)
    page_num = models.IntegerField()

    def __str__(self):
        return self.resume.name + ", page " + str(self.page_num)


class Component(models.Model):
    class ComponentTypes(models.TextChoices):
        CARD = 'C_CARD', _('Card Component')
        COL_A = 'C_COL_A', _('Colored Area')
        T_COL_A = 'C_T_COL_A', _('Themed Colored Area')

    component_type = models.CharField(
        max_length=32,
        choices=ComponentTypes.choices
    )
    col = models.IntegerField()
    row = models.IntegerField()
    width = models.IntegerField(default=1)
    height = models.IntegerField(default=1)
    inside_component = models.ForeignKey('self', on_delete=models.CASCADE,
                                         related_name='child_components',
                                         blank=True, null=True)

    inside_page = models.ForeignKey(Page, on_delete=models.CASCADE,
                                    related_name='child_components',
                                    blank=True, null=True)

    def __str__(self):
        return self.component_type + "(" +\
                ', '.join(map(str, [self.row, self.col,
                                    self.width, self.height])) + ")"


class SettingsRow(models.Model):
    component = models.ForeignKey(Component, on_delete=models.CASCADE,
                                  related_name='settings',
                                  blank=True, null=True)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE,
                               related_name='settings', blank=True, null=True)
    page = models.ForeignKey(Page, on_delete=models.CASCADE,
                             related_name='settings', blank=True, null=True)
    setting = models.CharField(max_length=64)
    value = models.CharField(max_length=64)
