# Generated by Django 4.1.4 on 2023-01-02 16:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accountApp', '0003_alter_userprofile_user'),
        ('homeApp', '0004_alter_postimagesmodel_post_alter_postmodel_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='postsubcommentmodel',
            name='commentText',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='postmodel',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accountApp.userprofile'),
        ),
    ]
