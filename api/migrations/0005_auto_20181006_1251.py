# Generated by Django 2.1 on 2018-10-06 12:51

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_question_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='body',
            field=tinymce.models.HTMLField(default=''),
        ),
    ]
