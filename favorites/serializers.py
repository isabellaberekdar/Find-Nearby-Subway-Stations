from rest_framework import serializers
from .models import Line, FavoriteLines

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class FavoriteLinesSerializer(serializers.ModelSerializer):
    #lines = StringSerializer(many=True)

    class Meta:
        model = FavoriteLines
        fields = ('id', 'lines')
        """ 
    def update(self, instance, validated_data):
        lines_data = validated_data.pop('lines')
        instance.name = validated_data['name']

        for line_data in lines_data:
            line, created = Line.objects.get_or_create(id=line['id'])
            favorites.lines.add(line)
        return instance """

class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = ('id','name')



'''
class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = '__all__'

class FavoriteLinesSerializer(serializers.ModelSerializer):
    #lines = StringSeriablizer(many=True)
    #lines = serializers.ListSerializer(child=serializers.CharField())
    lines = LineSerializer(many=True)
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = FavoriteLines
        fields = ('id', 'lines')
        
    def create(self, validated_data):
        lines_data = validated_data.pop('lines')
        favorites = FavoriteLines.objects.create(**validated_data)
        for datum in lines_data:
            Line.objects.create(favorites=favorites, **lines_data)
        return favorites
    
    def update(self, instance, validated_data):
        lines_data = validated_data.pop('lines')
        #instance.name = validated_data['name']

        for datum in lines_data:
            line, created = Line.objects.get_or_create(name=line['name'])
            favorites.lines.add(line)
        return instance
 
    def create(self, validated_data):
        lines = validated_data.pop('lines',[])
        favorites = super().create(validated_data)
        lines_qs = Line.objects.filter(name__in=lines)
        favorites.lines.add(*lines_qs)
        return favorites 
'''