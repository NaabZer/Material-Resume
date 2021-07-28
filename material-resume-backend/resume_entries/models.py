from django.db import models
from django.conf import settings

# Create your models here.


class Language(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name='languages',
                             on_delete=models.CASCADE)
    language = models.CharField(max_length=2, default='en')


class Experience(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              related_name='experiences',
                              on_delete=models.CASCADE)
    start = models.DateField(blank=True, null=True)
    end = models.DateField(blank=True, null=True)
    pass


class ExperienceEntry(models.Model):
    experience = models.ForeignKey(Experience, related_name='entries',
                                   on_delete=models.CASCADE)
    lang = models.CharField(max_length=2, default='en')
    title = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)


class Text(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              related_name='texts',
                              on_delete=models.CASCADE)
    pass


class TextEntry(models.Model):
    text_obj = models.ForeignKey(Text, related_name='entries',
                                 on_delete=models.CASCADE)
    lang = models.CharField(max_length=2, default='en')
    text = models.TextField(blank=True, null=True)
