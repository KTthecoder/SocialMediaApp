from django.db import models
from django.contrib.auth.models import User
from accountApp.models import *
from searchApp.models import *
from django_resized import ResizedImageField

# Create your models here.
class PostModel(models.Model):
    likes = models.IntegerField(default=0)
    description = models.TextField()
    location = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    dateAdded = models.DateTimeField(auto_now=False, auto_now_add=True)
    category = models.ForeignKey(CategoriesModel, on_delete=models.CASCADE)

    def __str__(self):
        return self.description

class PostImagesModel(models.Model):
    # image = models.ImageField(upload_to='postImages/')
    image = ResizedImageField(force_format="WEBP", quality=80, upload_to="postImages/")
    post = models.ForeignKey(PostModel, related_name='images', on_delete=models.CASCADE)

    def __str__(self):
        return self.image.url

class PostCommentModel(models.Model):
    comment = models.TextField()
    dataAdded = models.DateTimeField(auto_now=False, auto_now_add=True)    
    post = models.ForeignKey(PostModel, related_name='biggestComment', on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.comment

class PostSubCommentModel(models.Model):
    commentText = models.TextField()
    dataAdded = models.DateTimeField(auto_now=False, auto_now_add=True)    
    comment = models.ForeignKey(PostCommentModel, on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.commentText

class SavedUserPosts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(PostModel, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username + " - " + str(self.post.description)
