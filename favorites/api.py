from .models import FavoriteLines, Line
from rest_framework import viewsets, permissions
from .serializers import FavoriteLinesSerializer, LineSerializer

class FavoriteLinesViewSet(viewsets.ModelViewSet):
    #queryset = FavoriteLines.objects.all()
    
    permission_classes = [
        #permissions.AllowAny
        permissions.IsAuthenticated
    ]
    serializer_class = FavoriteLinesSerializer
    #lookup_field = 'user.username'               # get line by name instead of id

    # Return logged in user's favorite lines
    def get_queryset(self):
        return self.request.user.favoriteLines.all() #return user's favorite lines

    def perform_create(self, serializer): # save owner when favorite station is made
        serializer.save(user=self.request.user) #changed 


class LineViewSet(viewsets.ModelViewSet):
    queryset = Line.objects.all()
    
    permission_classes = [
        permissions.AllowAny
        #permissions.IsAuthenticated
    ]
    serializer_class = LineSerializer
    lookup_field = 'name'               # get line by name instead of id

    """ def get_queryset(self, request):
        return Line.objects.get(name=request.name) #return user's favorite lines
 """
    #def get_queryset(self):
    #    return self.request.user.favoriteLines.all() #return user's favorite lines

"""     def perform_create(self, serializer): # save owner when favorite station is made
        serializer.save(user=self.request.user) #changed """

