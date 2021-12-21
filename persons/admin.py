from django.contrib import admin
from . models import Person


class PersonAdmin(admin.ModelAdmin):
    list_display = ('identification', 'first_name', 'last_name')


admin.site.register(Person, PersonAdmin)
