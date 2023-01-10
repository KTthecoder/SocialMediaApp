import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 

const PostThreadComment = ({commentText, likes}) => {
    const { width } = Dimensions.get('screen')

    return (
        <View className='mt-2' style={{width: width * 0.90}}>
            <View className='flex-row items-center'>
                <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-SemiBold'}}>Gjogfodjgodfj</Text>
                <Text className='text-white text-xs pl-2' style={{fontFamily: 'Montserrat-Regular'}}>{likes && likes} likes</Text>
            </View>
            <View className='flex-row items-center justify-between mt-1 pb-3 mb-3 '>
                <Text className='text-white text-sm pl-2 mt-1' numberOfLines={2} style={{fontFamily: 'Montserrat-Regular', width: width * 0.83, lineHeight: 23}}>{commentText && commentText}</Text>
                <AntDesign name="hearto" size={15} color="white" /> 
            </View>
        </View>
        
    )
}

export default PostThreadComment