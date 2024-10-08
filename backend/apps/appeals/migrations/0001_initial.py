# Generated by Django 5.0.1 on 2024-03-11 17:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Appeal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('theme', models.CharField(max_length=150, unique=True, verbose_name='тема')),
                ('text', models.TextField(unique=True, verbose_name='текст')),
                ('date_of_creation', models.DateField(auto_now_add=True)),
                ('is_canceled', models.BooleanField(default=False)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='создатель')),
            ],
            options={
                'verbose_name': 'Заявка',
                'verbose_name_plural': 'Заявки',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='AppealMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(verbose_name='содержание')),
                ('image', models.ImageField(upload_to='media/messages', verbose_name='изображение')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='отправитель')),
            ],
            options={
                'verbose_name': 'Сообщение',
                'verbose_name_plural': 'Сообщения',
            },
        ),
        migrations.CreateModel(
            name='AppealChat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appeal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chat', to='appeals.appeal', verbose_name='заявка')),
                ('messages', models.ManyToManyField(blank=True, to='appeals.appealmessage', verbose_name='сообщения')),
            ],
            options={
                'verbose_name': 'Чат заявки',
                'verbose_name_plural': 'Чаты заявок',
            },
        ),
    ]
