from django.contrib import admin
from . models import Employee


class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('employee_id', 'name_of_employee', 'entry_permit', 'ward')


admin.site.register(Employee, EmployeeAdmin)
