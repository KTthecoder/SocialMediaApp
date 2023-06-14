import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CachedImage from 'react-native-expo-cached-image'

const SearchModalBlock1 = ({followers, username, image}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => {navigation.navigate('UserProfileScreen', {username: username}) }} className='mb-4 flex-row pb-4 items-center' style={{width: width * 0.94, borderBottomColor: '#383838', borderBottomWidth: 1}}>
            <CachedImage source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}}className='rounded-full mr-4' style={{width: 45, height: 45}} />
            <View style={{width: '80%'}}>
                <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-SemiBold'}}>{username}</Text>
                <Text className='text-gray-500 text-xs mt-1' style={{fontFamily: 'Montserrat-Medium'}}>{followers} Followers | Not Followed</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SearchModalBlock1