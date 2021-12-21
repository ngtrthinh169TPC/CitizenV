from django.db import models


class Department(models.Model):
    department_id = models.CharField(primary_key=True, max_length=8)
    name_of_department = models.CharField(max_length=256)
    entry_permit = models.BooleanField(default=False)
