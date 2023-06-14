import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PostBlockCommentShort from './PostBlockCommentShort';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import * as SecureStore from "expo-secure-store"
import { FontAwesome } from '@expo/vector-icons';

const PostBlock = ({username, biggestComment, location, likes, commentsCount, description, images, profileImage, postId, setChange, change, liked}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    const { user } = useContext(AuthContext)

    async function LikePost() {
        await SecureStore.getItemAsync("accessToken").then(async(token) => {
            let response = await fetch('http://192.168.1.34:8000/api/post/like', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({
                    post: postId,
                    user: user['user_id']
                })
            })
            let data = await response.json()
            if(response.status == 200){
                console.log(data)
                if(change === true){
                    setChange(false)
                }
                else{
                    setChange(true)
                }
            }
            else{
                console.log(data)
            }
        })
    }

    async function DisLikePost() {
        await SecureStore.getItemAsync("accessToken").then(async(token) => {
            let response = await fetch(`http://192.168.1.34:8000/api/post/dislike/${postId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({
                    post: postId,
                    user: user['user_id']
                })
            })
            let data = await response.json()
            if(response.status == 200){
                console.log(data)
                if(change === true){
                    setChange(false)
                }
                else{
                    setChange(true)
                }
            }
            else{
                console.log(data)
            }
        })
    }

    return (
        <View className='items-center pb-8' style={{borderTopWidth: 1, borderColor: '#323232'}}>
            <View className='flex-row items-center justify-between pt-2 pb-3' style={{width: width * 0.94}}>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen', {username: username})} className='justify-start items-start flex-row'>
                    <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${profileImage}`}} className='bg-red-300 rounded-full' style={{width: 40, height: 40, resizeMode: 'cover'}}/>
                    <View className='ml-2'>
                        <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Medium'}}>{username}</Text>
                        <Text className='text-gray-300 text-xs' style={{fontFamily: 'Montserrat-Regular'}}>{location}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='py-3 pl-3'>
                    <MaterialIcons name="save-alt" size={25} color="white" />
                </TouchableOpacity>
            </View>
            {images && 
                <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${images}`}} style={{width: width, height: width * 0.94, resizeMode: 'cover'}} />}
            <View className='items-start pt-5 justify-between flex-row pb-3' style={{width: width * 0.94, borderBottomWidth: 1, borderColor: '#323232'}}>
                <View className='flex-row'>
                    {liked && liked === 'No' ? 
                        <TouchableOpacity onPress={() => LikePost()} className='flex-row items-center justify-center'>
                            <AntDesign name="hearto" size={18} color="white" /> 
                            <Text className='text-white text-sm pl-2' style={{fontFamily: 'Montserrat-SemiBold'}}>{likes}</Text>
                        </TouchableOpacity>
                    : 
                        <TouchableOpacity onPress={() => DisLikePost()} className='flex-row items-center justify-center'>
                            <FontAwesome name="heart" size={18} color="red" />
                            <Text className='text-white text-sm pl-2' style={{fontFamily: 'Montserrat-SemiBold'}}>{likes}</Text>
                        </TouchableOpacity>
                    } 
                    <TouchableOpacity onPress={() => navigation.navigate('PostCommentsScreen', {autofocus: true, postId: postId})} className='flex-row ml-6 items-center justify-center'>
                        <FontAwesome5 name="comment-alt" size={18} color="white" />
                        <Text className='text-white text-sm pl-2' style={{fontFamily: 'Montserrat-SemiBold'}}>{commentsCount}</Text>
                    </TouchableOpacity>
                </View>
                <Text className='text-white mb-1' style={{fontFamily: 'Montserrat-Medium', fontSize: 13}}>21-09-2022</Text>
            </View>
            <View className='items-start justify-start mt-3 flex-row' style={{width: width * 0.94}}>     
                <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Regular'}}>
                {description}</Text>
            </View>
            {commentsCount != 0 ? 
                <>
                <TouchableOpacity onPress={() => navigation.navigate('PostCommentsScreen', {autofocus: false, postId: postId})} className='items-start pt-4 justify-between pb-3' style={{width: width * 0.94}}>
                    <Text className='text-gray-400 text-sm' style={{fontFamily: 'Montserrat-Medium'}}>Show {commentsCount} Comments</Text>
                </TouchableOpacity>
                <View className='items-start justify-between' style={{width: width * 0.94}}>
                    <PostBlockCommentShort biggestComment={biggestComment} username={username}/>
                </View>
            </>
            : 
            null
            }
        </View>
    )
}

export default PostBlock