# Generated by Django 3.2.5 on 2021-08-31 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume_components', '0010_auto_20210830_1540'),
    ]

    operations = [
        migrations.AlterField(
            model_name='settingsrow',
            name='value',
            field=models.CharField(blank=True, max_length=256),
        ),
    ]
