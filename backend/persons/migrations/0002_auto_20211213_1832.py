# Generated by Django 3.1.12 on 2021-12-13 18:32

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wards', '0001_initial'),
        ('persons', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='date_of_birth',
            field=models.DateField(blank=True, default=datetime.date(1970, 1, 1)),
        ),
        migrations.AddField(
            model_name='person',
            name='education',
            field=models.CharField(default='none', max_length=256),
        ),
        migrations.AddField(
            model_name='person',
            name='occupation',
            field=models.CharField(default='none', max_length=256),
        ),
        migrations.AddField(
            model_name='person',
            name='permanent_address',
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AddField(
            model_name='person',
            name='place_of_birth',
            field=models.CharField(default='unknown', max_length=64),
        ),
        migrations.AddField(
            model_name='person',
            name='place_of_origin',
            field=models.CharField(default='unknown', max_length=64),
        ),
        migrations.AddField(
            model_name='person',
            name='religious',
            field=models.CharField(default='none', max_length=64),
        ),
        migrations.AddField(
            model_name='person',
            name='temporary_address',
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AddField(
            model_name='person',
            name='ward',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='wards.ward'),
            preserve_default=False,
        ),
    ]
