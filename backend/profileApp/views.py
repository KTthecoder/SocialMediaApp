from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from accountApp.models import *
from .serializers import *
from homeApp.models import *
from homeApp.serializers import *
from .models import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ProfileScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            # try:
            profile = UserProfile.objects.get(user = request.user)
            profileSerializer = ProfileSerializer(profile, context={'user': request.user})

            return Response(profileSerializer.data, status=status.HTTP_200_OK)
            # except:
            #     response = {'Error' : 'User Does Not Exists'}
            #     return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def UserSavedPosts(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                posts = SavedUserPosts.objects.filter(user = request.user)
                postsSerializer = SavedPostsSerializer(posts, many = True, context={'user': request.user})

                return Response(postsSerializer.data, status=status.HTTP_200_OK)
            except:
                response = {'Error' : 'User Does Not Exists'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def FoundProfile(request, username):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                user = User.objects.get(username = username)
                profile = UserProfile.objects.get(user = user)
                profileSerializer = ProfileSerializer(profile, context={'user': request.user})

                return Response(profileSerializer.data, status=status.HTTP_200_OK)
            except:
                response = {'Error' : 'User Does Not Exists'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def CreatePost(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            post = PostCreateSerializer(data = request.data, context={'user': request.user})
            if post.is_valid():
                post.save()
                postItem = PostModel.objects.get(description = request.data['description'], location = request.data['location'], user = request.data['user'])
                print(postItem)
                imageData = {
                    'image' : request.data['image'],
                    'post' : postItem.id
                }
                image = PostImagesSerializer(data=imageData, context={'user': request.user})
                if image.is_valid():
                    image.save()
                    data = {'Success' : 'Post Added Succesfully'}
                    return Response(data, status=status.HTTP_200_OK)
            else:
                data = {'Error' : 'Post Not Added Succesfully'}
                return Response(data, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def FavoriteUserPosts(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                # posts = FavoritePostsModel.objects.filter(user = request.user)
                # postsSerializer = FavoritePostListSerializer(posts, many = True)

                # return Response(postsSerializer.data, status=status.HTTP_200_OK)


                firstPost = FavoritePostsModel.objects.filter(user = request.user).first()

                allPosts = FavoritePostsModel.objects.filter(user = request.user)[1:]

                firstPostSerializer = FavoritePostListSerializer(firstPost, context={'user': request.user})
                allPostSerializer = FavoritePostListSerializer(allPosts, many = True, context={'user': request.user})
                return Response([firstPostSerializer.data, allPostSerializer.data], status=status.HTTP_200_OK)

            except:
                response = {'Error' : 'User Does Not Exists'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)



