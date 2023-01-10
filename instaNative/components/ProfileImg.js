import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CachedImage from 'react-native-expo-cached-image'

const ProfileImg = ({postId, image}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetailsScreen', {postId: postId})} className='bg-red-200 mt-2' style={{width: '32%', height: 110}} >
      <CachedImage source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}} style={{width: '100%', height: 110}} />
    </TouchableOpacity>
  )
}

export default ProfileImg