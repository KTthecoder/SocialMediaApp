"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from django.conf.urls.static import static
from django.conf import settings
from accountApp.views import *
from homeApp.views import *
from searchApp.views import *
from profileApp.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/register', RegisterPage, name='RegisterPage'),
    path('api/home', HomeScreen, name='HomeScreen'),
    path('api/search', SearchScreen, name='SearchScreen'),
    path('api/category/<slug:slug>', CategoryDetails, name='CategoryDetails'),
    path('api/post/<int:postId>/comments', PostComments, name='PostComments'),
    path('api/profile', ProfileScreen, name='ProfileScreen'),
    path('api/profile/saved-posts', UserSavedPosts, name='UserSavedPosts'),
    path('api/post/<int:postId>', PostDetails, name='PostDetails'),
    path('api/profile/<str:username>', FoundProfile, name='FoundProfile'),
    path('api/search/user/<str:search>', FoundUsers, name='FoundUsers'),
    path('api/search/user/<str:search>/all', FoundAllUsers, name='FoundAllUsers'),
    path('api/comment/add', AddComment, name='AddComment'),
    path('api/post/like', LikePost, name='LikePost'),
    path('api/post/dislike/<int:postId>', DisLikePost, name='DisLikePost'),
    path('api/liked/post/<int:postId>', UserLikedPosts, name='UserLikedPosts'),
    path('api/post/create', CreatePost, name='CreatePost'),
    path('api/post/favorite', FavoriteUserPosts, name='FavoriteUserPosts'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
