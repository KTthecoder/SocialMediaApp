import { View, Text, Button, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Dimensions, ActivityIndicator, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import HomeStoryBlock from '../components/HomeStoryBlock';
import PostBlock from '../components/PostBlock';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PostBlockCommentShort from '../components/PostBlockCommentShort';
import PostBlock1 from '../components/PostBlock1';
import useFetchGet from '../hooks/useFetchGet';

const PostDetailsScreen = () => {
    const { width } = Dimensions.get('screen')

    const navigation = useNavigation()
    const route = useRoute()

    const { data, isLoading, change, setChange } = useFetchGet(`http://192.168.1.34:8000/api/post/${route.params.postId}`)

    return (
        <SafeAreaView className='w-screen justify-center items-center bg-[#141414] flex-1'>
            <View className='justify-start items-center flex-row pb-2' style={{width: width * 0.94}}>
                <View className='flex-row'>
                    <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className='text-white ml-1' style={{fontFamily: 'Montserrat-SemiBold', fontSize: 19}}>Posts</Text>
                    {/* <Text className='text-white ml-1 text-base' style={{fontFamily: 'Montserrat-Regular'}}>ksawery.tkaczyk</Text> */}
                </View>
            </View>
            <ScrollView className='flex-1 w-screen' contentContainerStyle={{alignItems: 'center', paddingBottom: 30}} showsVerticalScrollIndicator={false}>
                {data && <PostBlock1 setChange={setChange} change={change} postId={data.id} liked={data.liked} biggestComment={data.biggestComment} key={data['id']} profileImage={data.userImage} images={data.image.image} username={data.userName} location={data.location} likes={data.likes} commentsCount={data.commentsCount} description={data['description']}/>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostDetailsScreen