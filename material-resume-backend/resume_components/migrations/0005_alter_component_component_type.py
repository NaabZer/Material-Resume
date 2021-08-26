# Generated by Django 3.2.5 on 2021-08-23 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume_components', '0004_alter_component_component_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='component',
            name='component_type',
            field=models.CharField(choices=[('E_CARD', 'Card Experience'), ('C_COL_A', 'Colored Area'), ('C_T_COL_A', 'Themed Colored Area')], max_length=32),
        ),
    ]
