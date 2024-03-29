import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator screenOptions={{tabBarStyle: {
            height: Platform.OS === 'ios' ? 87 : 55,
            borderTopWidth: 0,
            position: 'absolute',
            shadowOpacity: 0,
            elevation: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#141414'
        }}}>
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({size, focused}) => (
                    <AntDesign name="home" size={size} color={focused ? 'red' : 'gray'} />
                ),
                tabBarLabelStyle: {paddingBottom: 5},
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
                title: 'Home',
            }} />
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                headerShown: false,
                tabBarIcon: ({size, focused}) => (
                    <AntDesign name="search1" size={size} color={focused ? 'red' : 'gray'} />
                ),
                tabBarLabelStyle: {paddingBottom: 5},
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
                title: 'Search',
            }}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                headerShown: false,
                tabBarIcon: ({size, focused}) => (
                    <Ionicons name="person-outline" size={size} color={focused ? 'red' : 'gray'}  />
                ),
                tabBarLabelStyle: {paddingBottom: 5},
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
                title: 'Profile',
                
            }}/>
        </Tab.Navigator>
    )
}

export default TabNav