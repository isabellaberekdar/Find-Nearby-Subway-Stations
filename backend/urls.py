from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('api/', include('favorites.urls')),
    path('api/auth/', include('users.urls')),
    path('admin/', admin.site.urls),
    re_path(r'.*', index, name='index'),
]

""" urlpatterns += re_path(r'.*', index)
 """