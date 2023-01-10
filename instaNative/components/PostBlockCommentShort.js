import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 

const PostBlockCommentShort = ({biggestComment}) => {
    const { width } = Dimensions.get('screen')

    return (
        <>
            <Text className='text-white text-sm mt-1' style={{fontFamily: 'Montserrat-SemiBold'}}>{biggestComment.userName}</Text>
            <View className='flex-row items-center justify-between' style={{width: width * 0.94}}>
                <Text className='text-white text-sm pl-2 mt-1' numberOfLines={2} style={{fontFamily: 'Montserrat-Regular', width: width * 0.83, lineHeight: 23}}>{biggestComment.comment}</Text>
                <AntDesign name="hearto" size={15} color="white" /> 
            </View>
        </>
    )
}

export default PostBlockCommentShort