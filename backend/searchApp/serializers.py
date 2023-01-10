from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
from accountApp.models import *
from accountApp.serializers import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriesModel
        fields = '__all__'

class FavoriteCategorySerializer(serializers.ModelSerializer):
    categoryModel = serializers.SerializerMethodField('get_category')

    class Meta:
        model = FavoriteCateogryModel
        fields = ['id', 'categoryModel', 'user']

    def get_category(self, category):
        objects = CategoriesModel.objects.get(id = category.category.id)
        serializer = CategorySerializer(objects)
        return serializer.data

class UserProfilSmalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'image', 'followers', 'following', 'backgroundImage']

class UserFoundSerializer(serializers.ModelSerializer):
    userModel = serializers.SerializerMethodField('get_user')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'userModel']

    def get_user(self, profile):
        user = UserProfile.objects.get(user = profile.id)
        userSerializer = UserProfilSmalleSerializer(user)
        return userSerializer.data

