import { View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import ProfileImg from '../components/ProfileImg'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet'
import CachedImage from 'react-native-expo-cached-image';

const UserProfileScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()
    const route = useRoute()
    const { data, isLoading } = useFetchGet(`http://192.168.1.34:8000/api/profile/${route.params.username}`)
  
    if (isLoading){
        return (
          <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
              <ActivityIndicator size='large' />
          </View>
        )
    }

    return (
        <View className='bg-[#141414]' style={{alignItems: 'center', paddingBottom: 100}}>
            <SafeAreaView className='w-screen justify-center items-center'>
                <View className='justify-start items-center flex-row pb-2' style={{width: width * 0.94}}>
                    <View className='flex-row'>
                        <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back-outline" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-white ml-1' style={{fontFamily: 'Montserrat-SemiBold', fontSize: 19}}>Profile</Text>
                </View>
            </SafeAreaView>
            <ScrollView className='w-screen bg-[#141414]' contentContainerStyle={{alignItems: 'center', paddingBottom: 250}} showsVerticalScrollIndicator={false}>
                {data && <CachedImage source={{cache: "force-cache", uri: `http://192.168.1.34:8000${data['backgroundImage']}`}} className='absolute' style={{width: '100%', height: width * 0.50}} />}
                <SafeAreaView style={{top: width * 0.35, width: width * 0.94}}>
                    {data && <CachedImage source={{cache: "force-cache", uri: `http://192.168.1.34:8000${data['image']}`}}className='rounded-full' style={{width: 100, height: 100, zIndex: 1, borderWidth: 3, borderColor: 'white'}} />}
                    <Text className='text-white text-xl mt-4' style={{fontFamily: 'Montserrat-SemiBold', zIndex: 1, width: '90%'}}>{data && data['userModel']}</Text>
                    <View className='justify-start items-center flex-row mt-4'>
                        <View className='justify-center items-center mr-7'>
                            <Text className='text-white text-base text-center' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['postsCount']}</Text>
                            <Text className='text-white text-sm text-center' style={{fontFamily: 'Montserrat-Regular'}}>Posts</Text>
                        </View>
                        <View className='justify-center items-center mr-7'>
                            <Text className='text-white text-base text-center' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['followers']}</Text>
                            <Text className='text-white text-sm text-center' style={{fontFamily: 'Montserrat-Regular'}}>Followers</Text>
                        </View>
                        <View className='justify-center items-center mr-7'>
                            <Text className='text-white text-base text-center' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['following']}</Text>
                            <Text className='text-white text-sm text-center' style={{fontFamily: 'Montserrat-Regular'}}>Following</Text>
                        </View>
                    </View>
                    <View className='justify-start mt-5'>
                        <TouchableOpacity className='bg-blue-500 justify-center items-center rounded-xl' style={{width: 120, height: 45}}>
                            <Text className='text-white text-sm text-center' style={{fontFamily: 'Montserrat-Medium'}}>Follow</Text>
                        </TouchableOpacity>    
                    </View>
                    <View className='flex-row justify-between flex-wrap mt-6' style={{width: width * 0.94}}>
                        {data && data['userPosts'].map((item) => (
                            <ProfileImg key={item.id} postId={item.id} image={item.image.image}/>
                        ))}
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
        
    )
}

export default UserProfileScreen