from django.db import models
from django.contrib.auth.models import User
from django_resized import ResizedImageField

# Create your models here.
class CategoriesModel(models.Model):
    image = ResizedImageField(force_format="WEBP", quality=80, upload_to="categoryImage/")
    title = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title

class FavoriteCateogryModel(models.Model):
    category = models.ForeignKey(CategoriesModel, related_name='categoryModel', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.category.title + " - " + self.user.username