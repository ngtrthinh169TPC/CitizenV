# Generated by Django 3.1.12 on 2021-12-13 18:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cities', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='District',
            fields=[
                ('district_id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('name_of_district', models.CharField(max_length=256)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cities.city')),
            ],
        ),
    ]