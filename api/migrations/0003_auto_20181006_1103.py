# Generated by Django 2.1 on 2018-10-06 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20181006_1102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='rank',
            field=models.IntegerField(),
        ),
    ]