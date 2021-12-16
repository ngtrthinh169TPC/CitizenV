from django.db import models
from districts.models import District


class Ward(models.Model):
    ward_id = models.CharField(primary_key=True, max_length=8)
    name_of_ward = models.CharField(max_length=256)
    entry_permit = models.BooleanField(default=False)
    administrative_unit = models.CharField(blank=True, max_length=256)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
