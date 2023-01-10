import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../contexts/AuthContext'
import LoginScreen from '../screens/LoginScreen'
import TabNav from './TabNav';
import NotificationsScreen from '../screens/NotificationsScreen';
import PostsByCategory from '../screens/PostsByCategory';
import SearchModalScreen from '../screens/SearchModalScreen';
import FavoritePostsScreen from '../screens/FavoritePostsScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import PostCommentsScreen from '../screens/PostCommentsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ChoosePostTypeScreen from '../screens/ChoosePostTypeScreen';
import AllResultsScreen from '../screens/AllResultsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const { isLoading, refreshToken } = useContext(AuthContext)

    if(isLoading){
        return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' />
          </View>
        )
    }

    return (
        <Stack.Navigator>
            {refreshToken === null ? (
                <>
                    <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} /> 
                    <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}} /> 
                </>     
            ) : (
                <>
                    <Stack.Screen name='TabNav' component={TabNav} options={{headerShown: false, presentation: 'fullScreenModal', animation: 'fade'}} /> 
                    <Stack.Screen name='NotificationsScreen' component={NotificationsScreen} options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'fullScreenModal'}} /> 
                    <Stack.Screen name='PostsByCategory' component={PostsByCategory} options={{headerShown: false}} /> 
                    <Stack.Screen name='SearchModalScreen' component={SearchModalScreen} options={{headerShown: false, presentation: 'modal', animation: 'slide_from_bottom'}} /> 
                    <Stack.Screen name='FavoritePostsScreen' component={FavoritePostsScreen} options={{headerShown: false}} /> 
                    <Stack.Screen name='PostDetailsScreen' component={PostDetailsScreen} options={{headerShown: false}} /> 
                    <Stack.Screen name='PostCommentsScreen' component={PostCommentsScreen} options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'fullScreenModal'}} /> 
                    <Stack.Screen name='UserProfileScreen' component={UserProfileScreen} options={{headerShown: false}} /> 
                    <Stack.Screen name='ChoosePostTypeScreen' component={ChoosePostTypeScreen} options={{headerShown: false, presentation: 'modal', animation: 'slide_from_bottom'}} />
                    <Stack.Screen name='AllResultsScreen' component={AllResultsScreen} options={{headerShown: false}} /> 
                    <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} options={{headerShown: false}} />
                </>           
            )}        
        </Stack.Navigator>
    )
}

export default Navigation