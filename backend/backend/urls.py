from rest_framework import routers
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path

from users.views import UserAPI, CustomAuthToken, WhoAmI

urlpatterns = [
    path('admin/', admin.site.urls),
]


router = routers.DefaultRouter()
router.register(r'user', UserAPI)

urlpatterns += [
    url('', include(router.urls)),
    path('api-token-auth/', CustomAuthToken.as_view(), name="obtain-token"),
    path('whoami/', WhoAmI.as_view(), name="whoami")
]
