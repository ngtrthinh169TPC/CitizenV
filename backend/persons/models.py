from django.db import models
from wards.models import Ward
from datetime import date


class Person(models.Model):
    identification = models.CharField(
        primary_key=True, max_length=16)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    date_of_birth = models.DateField(blank=True, default=date(1970, 1, 1))
    place_of_birth = models.CharField(default="unknown", max_length=64)
    place_of_origin = models.CharField(default="unknown", max_length=64)
    permanent_address = models.CharField(blank=True, max_length=64)
    temporary_address = models.CharField(blank=True, max_length=64)
    religious = models.CharField(default="none", max_length=64)
    occupation = models.CharField(default="none", max_length=256)
    education = models.CharField(default="none", max_length=256)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE)
