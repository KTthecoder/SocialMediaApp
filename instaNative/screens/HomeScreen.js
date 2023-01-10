import { View, Text, Button, TouchableOpacity, FlatList, SafeAreaView, Dimensions, ActivityIndicator, Image, VirtualizedList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font'
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import HomeStoryBlock from '../components/HomeStoryBlock';
import PostBlock from '../components/PostBlock';
import PostBlock1 from '../components/PostBlock1';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store"
import useFetchGet from '../hooks/useFetchGet';
import { ScrollView } from 'react-native-virtualized-view'

const HomeScreen = () => {
    const { logoutUser, accessToken } = useContext(AuthContext)

    const { width } = Dimensions.get('screen')

    const navigation = useNavigation()

    const { data, isLoading, change, setChange } = useFetchGet('http://192.168.1.34:8000/api/home')

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-ExtraBold' : require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    })

    if (!fontsLoaded){
        return (
            <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    if (isLoading){
        return (
            <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <SafeAreaView className='w-screen justify-center items-center bg-[#141414] flex-1'>
            <View className='justify-between items-center flex-row pb-3' style={{width: width * 0.94}}>

                <View className='flex-row items-center justify-between' style={{width: width * 0.94}}>
                    <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.navigate('NotificationsScreen')}>
                        <Ionicons name="notifications-outline" size={25} color="white" />
                    </TouchableOpacity>
                    <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>PhotoApp</Text>
                    <TouchableOpacity className='pl-2 py-2' onPress={() => navigation.navigate('SearchScreen')}>
                        <AntDesign name="search1" size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <ScrollView className='flex-1 w-screen' contentContainerStyle={{alignItems: 'center', paddingBottom: 70}} showsVerticalScrollIndicator={false}> */}
                <View className='w-screen flex-1'>
                    <FlatList
                        nestedScrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<PostBlock1 liked={data[0].liked} change={change} setChange={setChange} postId={data[0].id} biggestComment={data[0].biggestComment} key={data[0]['id']} profileImage={data[0].userImage} images={data[0].image.image} username={data[0].userName} location={data[0].location} likes={data[0].likes} commentsCount={data[0].commentsCount} description={data[0]['description']}/>}
                        data={data[1]}
                        renderItem={({ item }) => (
                            <PostBlock liked={item.liked} change={change} setChange={setChange} postId={item.id} biggestComment={item.biggestComment} images={item.image.image} profileImage={item.userImage} username={item.userName} location={item.location} likes={item.likes} commentsCount={item.commentsCount} description={item['description']}/>
                        )}
                        key={(item) => item.id}
                        contentContainerStyle={{alignItems: 'center', paddingBottom: 70}}
                    />  
                    {/* {data[0] && <PostBlock1 liked={data[0].liked} change={change} setChange={setChange} postId={data[0].id} biggestComment={data[0].biggestComment} key={data[0]['id']} profileImage={data[0].userImage} images={data[0].image.image} username={data[0].userName} location={data[0].location} likes={data[0].likes} commentsCount={data[0].commentsCount} description={data[0]['description']}/>}
                    {data[1] && data[1].map((item, key) => (
                        <PostBlock liked={item.liked} change={change} setChange={setChange} key={key} postId={item.id} biggestComment={item.biggestComment} images={item.image.image} profileImage={item.userImage} username={item.userName} location={item.location} likes={item.likes} commentsCount={item.commentsCount} description={item['description']}/>
                    ))} */}
                </View>
            {/* </ScrollView> */}
            {/* <VirtualizedList
                data={DATA}
                initialNumToRender={4}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.key}
                getItemCount={getItemCount}
                getItem={getItem}
            /> */}
        </SafeAreaView>
    )
}

export default HomeScreen