from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(PostModel)
admin.site.register(PostImagesModel)
admin.site.register(PostCommentModel)
admin.site.register(PostSubCommentModel)
admin.site.register(SavedUserPosts)