# Generated by Django 3.0.6 on 2020-05-31 12:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resume_components', '0002_auto_20200531_1252'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Components',
            new_name='Component',
        ),
        migrations.RenameModel(
            old_name='settings_row',
            new_name='SettingsRow',
        ),
    ]