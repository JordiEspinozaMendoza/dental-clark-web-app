# Generated by Django 3.1.7 on 2021-04-13 01:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_service_img'),
    ]

    operations = [
        migrations.RenameField(
            model_name='service',
            old_name='img',
            new_name='image',
        ),
    ]
