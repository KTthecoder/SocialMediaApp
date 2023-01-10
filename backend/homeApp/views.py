from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from django.db.models import Count
from profileApp.models import *
from profileApp.serializers import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def HomeScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            firstPost = PostModel.objects.all().order_by('-dateAdded').first()

            allPosts = PostModel.objects.all().order_by('-dateAdded')[1:]

            firstPostSerializer = PostSerializer(firstPost, context={'user': request.user})
            allPostSerializer = PostSerializer(allPosts, many = True, context={'user': request.user})
            return Response([firstPostSerializer.data, allPostSerializer.data], status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def PostComments(request, postId):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'Post': None,
                'Comments' : None
            }

            post = ''

            try:
                post = PostModel.objects.get(id = postId)
                postSerializer = PostSerializer(post, context={'user': request.user})
                response['Post'] = postSerializer.data
            except:
                postSerializer = {'Error' : 'This Post Does Not Exists'}
                response['Post'] = postSerializer

            comments = PostCommentModel.objects.filter(post = post)
            
            if comments.exists():
                commentSerializer = PostCommentsSerializer(comments, many = True, context={'user': request.user})
                response['Comments'] = commentSerializer.data
            else:
                commentSerializer = None
                response['Comments'] = commentSerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def PostDetails(request, postId):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                post = PostModel.objects.get(id = postId)
                postSerializer = PostSerializer(post, context={'user': request.user})
                return Response(postSerializer.data, status=status.HTTP_200_OK)
            except:
                postSerializer = {'Error' : 'This Post Does Not Exists'}
                return Response(postSerializer, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def AddComment(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            comment = PostCommentsSmallSerializer(data = request.data, context={'user': request.user})
            if comment.is_valid():
                comment.save()
                data = {'Success' : 'Comment Added Succesfully'}
                return Response(data, status=status.HTTP_200_OK)
            else:
                data = {'Error' : 'Comment Not Added, Bad Data'}
                return Response(data, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def LikePost(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            post = FavoritePostSerializer(data = request.data, context={'user': request.user})
            postData = PostModel.objects.get(id = request.data['post'])
            if post.is_valid():
                postData.likes = postData.likes + 1
                postData.save()
                post.save()
                data = {'Success' : 'Post Liked Added Succesfully'}
                return Response(data, status=status.HTTP_200_OK)
            else:
                data = {'Error' : 'Post Not Liked, Bad Data'}
                return Response(data, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def DisLikePost(request, postId):
    if request.method == 'POST':
        if request.user.is_authenticated:
            post = FavoritePostsModel.objects.get(user = request.user, post = postId)
            postData = PostModel.objects.get(id = request.data['post'])
            # if post.is_valid():
            postData.likes = postData.likes - 1
            post.delete()
            postData.save()
            data = {'Success' : 'Post Liked Added Succesfully'}
            return Response(data, status=status.HTTP_200_OK)
            # else:
            #     data = {'Error' : 'Post Not Liked, Bad Data'}
            #     return Response(data, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def UserLikedPosts(request, postId):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                post = FavoritePostsModel.objects.get(user = request.user, post = postId)
                postSerializer = FavoriteBigPostSerializer(post, context={'user': request.user})
                return Response(postSerializer.data, status=status.HTTP_200_OK)
            except:
                postSerializer = {'Error' : 'This Post Does Not Exists'}
                return Response(postSerializer, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)