# Generated by Django 3.2.5 on 2022-01-04 19:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resume_entries', '0005_transfer_languages'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='experienceentry',
            name='lang',
        ),
        migrations.RemoveField(
            model_name='textentry',
            name='lang',
        ),
    ]
