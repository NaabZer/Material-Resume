# Generated by Django 3.2.5 on 2021-08-05 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume_components', '0003_remove_component_resume'),
    ]

    operations = [
        migrations.AlterField(
            model_name='component',
            name='component_type',
            field=models.CharField(choices=[('C_CARD', 'Card Component'), ('C_COL_A', 'Colored Area')], max_length=32),
        ),
    ]
