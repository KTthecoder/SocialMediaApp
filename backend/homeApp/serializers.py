from .models import *
from rest_framework import serializers
from accountApp.serializers import *
from profileApp.models import *
from drf_extra_fields.fields import Base64ImageField

class PostSubCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostSubCommentModel
        fields = '__all__'

class PostCommentsSerializer(serializers.ModelSerializer):
    userName = serializers.SerializerMethodField('get_username')
    subComments = serializers.SerializerMethodField('get_sub_comments')
    
    class Meta:
        model = PostCommentModel
        fields = ['id', 'comment', 'dataAdded', 'post', 'likes', 'user', 'userName', 'subComments']
    
    def get_username(self, post):
        return post.user.user.username

    def get_sub_comments(self, post):
        
        subs = PostSubCommentModel.objects.filter(comment = post.id)

        if subs.exists():
            subsSerializer = PostSubCommentsSerializer(subs, many = True)
            return subsSerializer.data
        else:
            subsSerializer = 'None'
            return subsSerializer

class PostCommentsSmallSerializer(serializers.ModelSerializer):    
    class Meta:
        model = PostCommentModel
        fields = '__all__'

class PostImagesSerializer(serializers.ModelSerializer):
    image = Base64ImageField()
    class Meta:
        model = PostImagesModel
        fields= ['id', 'image', 'post']
    
    def create(self, validated_data):
        image=validated_data.pop('image')
        post=validated_data.pop('post')
        return PostImagesModel.objects.create(post=post, image=image)

class PostSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField('get_image')
    userName = serializers.SerializerMethodField('get_user_name')
    userImage = serializers.SerializerMethodField('get_user_image')
    commentsCount = serializers.SerializerMethodField('get_comments_count')
    biggestComment = serializers.SerializerMethodField('get_biggest_comment')
    liked = serializers.SerializerMethodField('is_liked')

    class Meta:
        model = PostModel
        fields = ['id', 'likes', 'description', 'liked', 'location', 'dateAdded', 'commentsCount', 'biggestComment', 'user', 'userName', 'userImage', 'image']

    def get_user_name(self, post):
        return post.user.user.username

    def get_user_image(self, post):
        return post.user.image.url
    
    def get_comments_count(self, post):
        comments = PostCommentModel.objects.filter(post = post.id).count()
        return comments

    def get_biggest_comment(self, post):
        comment = PostCommentModel.objects.filter(post = post.id).order_by('-likes').first()
        commentSerializer = PostCommentsSerializer(comment)
        return commentSerializer.data

    def get_image(self, post):
        image = PostImagesModel.objects.get(post = post.id)
        imageSerializer = PostImagesSerializer(image)
        return imageSerializer.data

    def is_liked(self, post):
        user = self.context.get("user") 
        try:
            favorite = FavoritePostsModel.objects.get(post = post.id, user = user.id)
            return 'Yes'
        except: 
            return 'No'
        

class PostSmallSerializer(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField('is_liked')
    image = serializers.SerializerMethodField('get_image')

    class Meta:
        model = PostModel
        fields = ['id', 'likes', 'liked', 'description', 'location', 'dateAdded', 'image']

    def get_image(self, post):
        image = PostImagesModel.objects.get(post = post.id)
        imageSerializer = PostImagesSerializer(image)
        return imageSerializer.data

    def is_liked(self, post):
        try:     
            favorite = FavoritePostsModel.objects.get(post = post.id)
            return 'Yes'
        except: 
            return 'No'

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostModel
        fields = '__all__'