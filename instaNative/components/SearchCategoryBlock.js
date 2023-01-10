import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CachedImage from 'react-native-expo-cached-image'

const SearchCategoryBlock = ({title, image, slug}) => {
  const navigation = useNavigation()

  return (
    
    <TouchableOpacity onPress={() => navigation.navigate('PostsByCategory', {slug: slug})} className='rounded-xl mt-4 relative' style={{width: '48%', height: 120}}>
        {image && <CachedImage source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}} className='rounded-xl' style={{width: '100%', height: 120}} />}
        <View className='justify-center items-center' style={{backgroundColor: 'rgba(10, 10, 10, 0.517)', bottom: 0, top: 0, right: 0, left: 0, position: 'absolute'}}>
          {title && <Text className='text-white text-base placeholder:text-center' style={{fontFamily: 'Montserrat-SemiBold', zIndex: 1, width: '90%'}}>{title}</Text>}
        </View>
    </TouchableOpacity>
  )
}

export default SearchCategoryBlock