from django.db import models
from cities.models import City


class District(models.Model):
    district_id = models.CharField(primary_key=True, max_length=8)
    name_of_district = models.CharField(max_length=256)
    entry_permit = models.BooleanField(default=False)
    administrative_unit = models.CharField(blank=True, max_length=256)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
