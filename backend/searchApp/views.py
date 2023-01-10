from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from django.db.models import Count
from homeApp.models import *
from homeApp.serializers import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def SearchScreen(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'Favorites' : None,
                'AllCategories' : None
            }
            
            favorites = FavoriteCateogryModel.objects.filter(user = request.user)

            if favorites.exists:
                favoritesSerializer = FavoriteCategorySerializer(favorites, many = True, context={'user': request.user})
                response['Favorites'] = favoritesSerializer.data
            else:
                favoritesSerializer = {'Error' : 'No Favorite Categories'}
                response['Favorites'] = favoritesSerializer
                
            allCategories = CategoriesModel.objects.all()

            if allCategories.exists:
                allCategoriesSerializer = CategorySerializer(allCategories, many = True, context={'user': request.user})
                response['AllCategories'] = allCategoriesSerializer.data
            else:
                allCategoriesSerializer = {'Error' : 'No Categories'}
                response['AllCategories'] = allCategoriesSerializer  

            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def CategoryDetails(request, slug):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response = {
                'Category': None,
                'First Post': None,
                'Posts' : None
            }

            try:
                category = CategoriesModel.objects.get(slug = slug)
                categorySerializer = CategorySerializer(category, context={'user': request.user})
                response['Category'] = categorySerializer.data
                
                posts = PostModel.objects.filter(category = category)

                if posts.exists():  
                    postsAll = PostModel.objects.filter(category = category)[1:]   
                    firstPostSerializer = PostSerializer(posts[0], context={'user': request.user})
                    postsSerializer = PostSerializer(postsAll, many = True, context={'user': request.user})

                    response['First Post'] = firstPostSerializer.data
                    response['Posts'] = postsSerializer.data
                else:
                    postsSerializer = 'No Posts In This Category'
                    response['Posts'] = postsSerializer

                return Response(response, status=status.HTTP_200_OK)
            except:
                response = {'Error' : 'This Category Does Not Exists'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def FoundUsers(request, search):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                userModel = User.objects.filter(username__contains = search)[:3]
                # users = UserProfile.objects.filter(user = userModel)
                # usersSerializer = UserProfileSerializer(userModel, many = True)
                usersSerializer = UserFoundSerializer(userModel, many = True, context={'user': request.user})
                return Response(usersSerializer.data, status=status.HTTP_200_OK)
            except:
                response = {'Error': 'User Not Found'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def FoundAllUsers(request, search):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                userModel = User.objects.filter(username__contains = search)
                # users = UserProfile.objects.filter(user = userModel)
                # usersSerializer = UserProfileSerializer(userModel, many = True)
                usersSerializer = UserFoundSerializer(userModel, many = True, context={'user': request.user})
                return Response(usersSerializer.data, status=status.HTTP_200_OK)
            except:
                response = {'Error': 'User Not Found'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'Error': 'User Unauthorized'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    else:
        response = {'Error': 'Bad Request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
