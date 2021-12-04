from django.db import models


class Person(models.Model):
    identification = models.PositiveBigIntegerField(
        primary_key=True, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
