from rest_framework import routers
from .api import FavoriteLinesViewSet, LineViewSet

router = routers.DefaultRouter()
router.register('favoriteLines', FavoriteLinesViewSet, 'favoriteLines')
router.register('Line', LineViewSet, 'Line')

urlpatterns = router.urls

""" 
/api/favoriteLines/
/api/favoriteLines/create/
/api/favoriteLines/delete/
/api/favoriteLines/update/
 """