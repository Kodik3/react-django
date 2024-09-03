# Generated by Django 5.0.1 on 2024-03-16 10:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appeals', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appealmessage',
            name='appeal',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='appeals.appeal', verbose_name='заявка'),
        ),
        migrations.AddField(
            model_name='appealmessage',
            name='date_added',
            field=models.DateTimeField(auto_now_add=True, default=None, verbose_name='дата отправления'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='appealmessage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='media/messages', verbose_name='изображение'),
        ),
        migrations.DeleteModel(
            name='AppealChat',
        ),
    ]
