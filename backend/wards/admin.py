from django.contrib import admin
from . models import Ward


class WardAdmin(admin.ModelAdmin):
    list_display = ('ward_id', 'administrative_unit',
                    'name_of_ward', 'entry_permit', 'district')


admin.site.register(Ward, WardAdmin)
