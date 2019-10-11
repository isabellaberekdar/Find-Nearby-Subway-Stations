from django.db import models
from django.contrib.auth.models import User


class Line(models.Model):
    name = models.CharField(
        max_length=9,
        help_text='Subway Line Name'
    )

    def __str__(self):
        return self.name



class FavoriteLines(models.Model):
    user = models.ForeignKey(
        User,
        related_name='favoriteLines',
        on_delete=models.CASCADE,
        null=True
    )

    lines = models.ManyToManyField(Line, related_name='lines', blank=True)

    class Meta:
        verbose_name_plural = 'FavoriteLines'

