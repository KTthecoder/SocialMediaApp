from accountApp.models import *
from rest_framework import serializers
from accountApp.serializers import *
from django.contrib.auth.models import User
from homeApp.models import *
from homeApp.serializers import *
from .models import *

class SavedPostsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')
    posts = serializers.SerializerMethodField('get_posts')

    class Meta:
        model = SavedUserPosts
        fields = ['id', 'user', 'posts']

    def get_user(self, post):
        user = User.objects.get(id = post.user.id)
        userSerializer = AccountSerializer(user)
        return userSerializer.data

    def get_posts(self, post):
        posts = PostModel.objects.filter(id = post.post.id)
        postsSerializer = PostSmallSerializer(posts, many = True)
        return postsSerializer.data

class ProfileSerializer(serializers.ModelSerializer):
    userModel = serializers.SerializerMethodField('get_user_model')
    userPosts = serializers.SerializerMethodField('get_user_posts')
    postsCount = serializers.SerializerMethodField('get_posts_count')
    savedPosts = serializers.SerializerMethodField('get_saved_posts')

    class Meta:
        model = UserProfile
        fields = ['id', 'image', 'followers', 'following', 'backgroundImage', 'postsCount', 'userModel', 'userPosts', 'savedPosts']
    
    def get_user_model(self, profile):
        user = User.objects.get(id = profile.user.id)
        userSerializer = AccountSerializer(user)
        return userSerializer.data['username']

    def get_user_posts(self, profile):
        posts = PostModel.objects.filter(user = profile.user.id)

        if posts.exists():
            postsSerializer = PostSerializer(posts, many = True)
            return postsSerializer.data
        else:
            postsSerializer = 'User Have No Posts'
            return postsSerializer

    def get_posts_count(self, profile):
        posts = PostModel.objects.filter(user = profile.user.id).count()
        return posts

    def get_saved_posts(self, profile):
        try:
            posts = SavedUserPosts.objects.get(user = profile.user.id)
            postsSerializer = SavedPostsSerializer(posts)
            return postsSerializer.data
        except:
            postsSerializer = 'None'
            return postsSerializer

class FavoritePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoritePostsModel
        fields = '__all__'

class FavoriteBigPostSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField('get_posts')

    class Meta:
        model = FavoritePostsModel
        fields = ['id', 'user', 'posts']

    def get_posts(self, post):
        posts = PostModel.objects.get(id = post.post.id, user = post.user.id)
        postsSerializer = PostSmallSerializer(posts)
        return postsSerializer.data

class FavoritePostListSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')
    posts = serializers.SerializerMethodField('get_posts')

    class Meta:
        model = FavoritePostsModel
        fields = ['id', 'user', 'posts']

    def get_user(self, post):
        user = User.objects.get(id = post.user.id)
        userSerializer = AccountSerializer(user)
        return userSerializer.data

    def get_posts(self, post):
        # user = self.context.get("user") 
        # print(user)
        # posts = PostModel.objects.get(id = post.post.id)
        posts = PostModel.objects.get(id = post.post.id)
        postsSerializer = PostSerializer(posts)
        return postsSerializer.data



        

