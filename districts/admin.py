from django.contrib import admin
from . models import District


class DistrictAdmin(admin.ModelAdmin):
    list_display = ('district_id', 'administrative_unit',
                    'name_of_district', 'entry_permit',                    'city')


admin.site.register(District, DistrictAdmin)
