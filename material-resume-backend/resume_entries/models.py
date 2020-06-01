from django.db import models

# Create your models here.


class Experience(models.Model):
    pass


class ExperienceEntry(models.Model):
    experience = models.ForeignKey(Experience, related_name='entries',
                                   on_delete=models.CASCADE)
    lang = models.CharField(max_length=2, default='en')
    title = models.TextField()
    start = models.DateField()
    end = models.DateField(blank=True)
    description = models.TextField()


class Text(models.Model):
    pass


class TextEntry(models.Model):
    text = models.ForeignKey(Text, related_name='entries',
                             on_delete=models.CASCADE)
    lang = models.CharField(max_length=2, default='en')
    text = models.TextField()
