# Generated by Django 4.1.4 on 2023-01-02 15:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accountApp', '0002_userprofile_delete_quizmodel'),
        ('homeApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='postcommentmodel',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accountApp.userprofile'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='postmodel',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accountApp.userprofile'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='postsubcommentmodel',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accountApp.userprofile'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
