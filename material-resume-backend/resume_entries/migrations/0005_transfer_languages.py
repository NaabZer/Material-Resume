# Generated by Django 3.2.5 on 2022-01-04 19:00

from django.db import migrations


def link_languages(apps, schema_editor):
    Language = apps.get_model('material_resume_backend', 'Language')
    ExperienceEntry = apps.get_model('resume_entries', 'ExperienceEntry')
    for entry in ExperienceEntry.objects.all():
        lang, created = Language.objects.get_or_create(language=entry.lang)
        entry.lang_id = lang
        entry.save()

    TextEntry = apps.get_model('resume_entries', 'TextEntry')
    for entry in TextEntry.objects.all():
        lang, created = Language.objects.get_or_create(language=entry.lang)
        entry.lang_id = lang
        entry.save()


class Migration(migrations.Migration):

    dependencies = [
        ('resume_entries', '0004_auto_20220104_1913'),
    ]

    operations = [
        migrations.RunPython(link_languages)
    ]
