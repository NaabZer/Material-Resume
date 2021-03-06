# Generated by Django 3.2.5 on 2021-08-04 12:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('resume_components', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='resume',
            name='owner',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='resumes', to='material_resume_backend.user'),
            preserve_default=False,
        ),
    ]
