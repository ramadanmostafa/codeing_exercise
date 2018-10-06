# Generated by Django 2.1 on 2018-10-06 11:02

from django.db import migrations, models
import django.db.models.deletion
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='body',
            field=tinymce.models.HTMLField(default=''),
        ),
        migrations.AlterField(
            model_name='answer',
            name='feedback',
            field=tinymce.models.HTMLField(default=''),
        ),
        migrations.AlterField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers_data', to='api.Question'),
        ),
        migrations.AlterField(
            model_name='answer',
            name='rank',
            field=models.IntegerField(max_length=1),
        ),
    ]
