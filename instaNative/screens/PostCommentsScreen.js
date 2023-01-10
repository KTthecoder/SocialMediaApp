import { View, Text, Button, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Dimensions, ActivityIndicator, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import PostBlockCommentShort from '../components/PostBlockCommentShort'
import PostBlockComment from '../components/PostBlockComment'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import useFetchGet from '../hooks/useFetchGet';
import * as SecureStore from "expo-secure-store"
import { AuthContext } from '../contexts/AuthContext';

const PostCommentsScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()
    const route = useRoute()
    const [comment, setComment] = useState('')

    const { data, isLoading, setChange, change } = useFetchGet(`http://192.168.1.34:8000/api/post/${route.params.postId}/comments`, true)
    const { user } = useContext(AuthContext)

    async function AddComment() {
        await SecureStore.getItemAsync("accessToken").then(async(token) => {
            let response = await fetch('http://192.168.1.34:8000/api/comment/add', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({
                    comment: comment,
                    post: route.params.postId,
                    user: user['user_id']
                })
            })
            let data = await response.json()
            if(response.status == 200){
                console.log(data)
                setChange(!change)
            }
            else{
                console.log(data)
            }
        })
    }

    if (isLoading){
        return (
            <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <SafeAreaView className='w-screen items-center bg-[#141414] flex-1'>
            <View className='flex-row items-center mt-2 mb-4 justify-between ' style={{width: width * 0.94}}>
                <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={28} color="white" />
                </TouchableOpacity>
                <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Comments</Text>
                <View className='px-2 py-2' style={{opacity: 0}}>
                    <Ionicons name="chevron-back-outline" size={28} color="white" />
                </View>
            </View>
            <View className='mb-5 flex-row justify-between' style={{width: width * 0.94, height: 45}}>
                <View className='flex-row bg-[#242424] rounded-xl items-center justify-center' style={{width: '84%', height: 45}}>
                    <TextInput placeholder='Write Comment...' autoFocus={route.params.autofocus} value={comment} onChangeText={(value) => setComment(value)} className='rounded-r-xl text-white flex-row flex-wrap pl-4' style={{width: '100%', height: 45}} placeholderTextColor={'gray'} />
                </View>
                <TouchableOpacity className='bg-blue-500 justify-center items-center rounded-xl' onPress={() => AddComment()} style={{width: 45, height: 45, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center'}}>
                    {/* <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-SemiBold'}}>Search</Text> */}
                    <AntDesign name="search1" size={24} color="white" />
                    {/* <Ionicons name="ios-add-outline" size={30} color="white" /> */}
                </TouchableOpacity>
            </View> 
            <ScrollView className='flex-1 w-screen p-1' contentContainerStyle={{alignItems: 'center', paddingBottom: 30}} showsVerticalScrollIndicator={false}>     
                <View className='items-start justify-between' style={{width: width * 0.94}}>
                    <View className='items-start justify-start pb-5 mb-3' style={{width: width * 0.94, borderBottomColor: '#252525', borderBottomWidth: 2}}> 
                        <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-SemiBold', lineHeight: 24}}>{data['Post'] && data['Post'].userName} 
                            <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Regular', lineHeight: 24}}> {data['Post'] && data['Post'].description} </Text>
                        </Text>    
                    </View>
                    {data['Comments'] && data['Comments'].map((item) => (
                        <PostBlockComment key={item.id} title={item.comment} likes={item.likes} username={item.userName} subComments={item.subComments} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostCommentsScreen