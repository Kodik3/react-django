# Generated by Django 5.0.1 on 2024-03-24 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appeals', '0002_appealmessage_appeal_appealmessage_date_added_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appeal',
            name='text',
            field=models.TextField(max_length=2000, unique=True, verbose_name='текст'),
        ),
    ]
