# Generated by Django 5.0.1 on 2024-01-30 13:56

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auths', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myuser',
            name='name',
        ),
        migrations.AddField(
            model_name='myuser',
            name='first_name',
            field=models.CharField(default='null', max_length=50, verbose_name='имя'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='myuser',
            name='last_name',
            field=models.CharField(default='null', max_length=60, verbose_name='фамилия'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='myuser',
            name='password',
            field=models.CharField(max_length=60, validators=[django.core.validators.RegexValidator(message='Пароль должен содержать не мение 8 символов', regex='^\\d{8}$')], verbose_name='пароль'),
        ),
        migrations.CreateModel(
            name='Appeals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('theme', models.CharField(max_length=100, verbose_name='тема')),
                ('text', models.TextField(verbose_name='текст')),
                ('answer', models.TextField(blank=True, null=True, verbose_name='ответ')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='пользователь')),
            ],
        ),
    ]
