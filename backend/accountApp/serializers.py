from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    userModel = serializers.SerializerMethodField('get_model')

    class Meta:
        model = UserProfile
        fields = ['id', 'image', 'followers', 'following', 'backgroundImage', 'userModel']

    def get_model(self, profile):
        user = User.objects.get(id = profile.user.id)
        userSerializer = AccountSerializer(user)
        return userSerializer.data

        
