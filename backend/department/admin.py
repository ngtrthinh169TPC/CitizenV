from django.contrib import admin
from . models import Department


class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('department_id', 'name_of_department', 'entry_permit')


admin.site.register(Department, DepartmentAdmin)
