import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CachedImage from 'react-native-expo-cached-image'

const HomeStoryBlock = ({title}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')} className='mr-3 '>
        <View className='rounded-full items-center justify-center bg-red-500' style={{width: 75, height: 75}}>
          <CachedImage source={{cache: "force-cache", uri: `https://picsum.photos/200/300`}} className='rounded-full' style={{width: 69, height: 69}} />
        </View>
        <Text className='text-white text-center mt-2 text-xs' numberOfLines={1} style={{fontFamily: 'Montserrat-Medium', width: 75}}>{title}</Text>
    </TouchableOpacity>
    
  )
}

export default HomeStoryBlock