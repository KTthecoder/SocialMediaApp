from django.db import models
from django.contrib.auth.models import User
from homeApp.models import *

# Create your models here.
class FavoritePostsModel(models.Model):
    post = models.ForeignKey(PostModel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username + " - " + str(self.post.description)
