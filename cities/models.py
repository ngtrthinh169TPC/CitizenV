from django.db import models
from department.models import Department


class City(models.Model):
    city_id = models.CharField(primary_key=True, max_length=8)
    name_of_city = models.CharField(max_length=256)
    entry_permit = models.BooleanField(default=False)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
