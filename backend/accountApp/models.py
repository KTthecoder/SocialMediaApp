from django.db import models
from django.contrib.auth.models import User
from django_resized import ResizedImageField

# Create your models here.
class UserProfile(models.Model):
    user = models.ForeignKey(User, related_name='userProfile', on_delete=models.CASCADE)
    image = ResizedImageField(force_format="WEBP", quality=80, upload_to="userImage/")
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)
    backgroundImage = models.ImageField(upload_to='userBackgroundImage/')

    def __str__(self):
        return self.user.username