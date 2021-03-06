# Generated by Django 2.2.5 on 2019-10-04 02:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favorites', '0007_auto_20191003_2144'),
    ]

    operations = [
        migrations.RenameField(
            model_name='favoritelines',
            old_name='user',
            new_name='owner',
        ),
        migrations.RemoveField(
            model_name='favoritelines',
            name='lines',
        ),
        migrations.AddField(
            model_name='favoritelines',
            name='name',
            field=models.CharField(default=2, help_text='Subway Line Name', max_length=9),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Line',
        ),
    ]
