import { View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {  useState } from 'react'
import ProfileImg from '../components/ProfileImg'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet'
import CachedImage from 'react-native-expo-cached-image';

const ProfileScreen = () => {
  const { width } = Dimensions.get('screen')
  const [screenToggle, setScreenToggle] = useState(true)
  const navigation = useNavigation()
  const { data, isLoading } = useFetchGet('http://192.168.1.34:8000/api/profile')

  if (isLoading){
    return (
      <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <ScrollView className='w-screen bg-[#141414]' contentContainerStyle={{alignItems: 'center', paddingBottom: 250}} showsVerticalScrollIndicator={false}>
      {data && <CachedImage source={{cache: "force-cache", uri: `http://192.168.1.34:8000${data.backgroundImage}`}} className='absolute' style={{width: '100%', height: width * 0.50}} />}

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

          <View className='flex-row justify-start mt-5'>
            <TouchableOpacity onPress={() => navigation.navigate('ChoosePostTypeScreen')} className='bg-[#383838] justify-center items-center rounded-xl mr-3' style={{height: 45, width: 55}}>
              <AntDesign name="plus" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FavoritePostsScreen')} className='bg-[#383838] justify-center items-center rounded-xl mr-3' style={{height: 45, width: 55}}>
              <AntDesign name="heart" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} className='bg-blue-500 justify-center items-center rounded-xl' style={{width: '55%'}}>
              <Text className='text-white text-sm text-center' style={{fontFamily: 'Montserrat-Regular'}}>Edit Profile</Text>
            </TouchableOpacity>        
          </View>
          
          <View className='flex-row justify-around mt-8 mb-5'>
            <TouchableOpacity onPress={() => setScreenToggle(true)} className='justify-center items-center pb-3' style={screenToggle ? {width: '50%', borderBottomWidth: 2, borderColor: 'red'} : {width: '50%', borderBottomWidth: 2, borderColor: '#383838'}}>
              <Ionicons name="grid-outline" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScreenToggle(false)} className='justify-center items-center pb-3' style={!screenToggle ? {width: '50%', borderBottomWidth: 2, borderColor: 'red'} : {width: '50%', borderBottomWidth: 2, borderColor: '#383838'}}>
              <MaterialIcons name="save-alt" size={26} color="white" />
            </TouchableOpacity>
          </View>

          {screenToggle ? (
            <View className='flex-row justify-between flex-wrap' style={{width: width * 0.94}}>
              {data && data['userPosts'] != 'User Have No Posts' ? data['userPosts'].map((item) => (
                <ProfileImg key={item.id} postId={item.id} image={item.image.image}/>
              )):null}
            </View>
          ) : (
            <View className='flex-row justify-between flex-wrap' style={{width: width * 0.94}}>
              {data && data['savedPosts'] != 'None' ? data['savedPosts']['posts'].map((item) => (
                <ProfileImg key={item.id} postId={item.id} image={item.image.image}/>
              )):null}
            </View>
          )}

      </SafeAreaView>
    </ScrollView>
  )
}

export default ProfileScreen