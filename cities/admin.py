from django.contrib import admin
from . models import City


class CityAdmin(admin.ModelAdmin):
    list_display = ('city_id', 'name_of_city', 'entry_permit', 'department')


admin.site.register(City, CityAdmin)
