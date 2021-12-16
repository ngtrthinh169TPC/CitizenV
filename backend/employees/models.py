from django.db import models
from wards.models import Ward


class Employee(models.Model):
    employee_id = models.CharField(primary_key=True, max_length=8)
    name_of_employee = models.CharField(max_length=256)
    entry_permit = models.BooleanField(default=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE)
