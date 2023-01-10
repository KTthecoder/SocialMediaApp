import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import PostThreadComment from './PostThreadComment';

const PostBlockComment = ({title, likes, username, subComments}) => {
    const { width } = Dimensions.get('screen')

    const [threadToggle, setThreadToggle] = useState(false)

    return (
        <>  
            <View className='flex-row items-center'>
                <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-SemiBold'}}>{username && username}</Text>
                <Text className='text-white text-xs pl-2' style={{fontFamily: 'Montserrat-Regular'}}>{likes && likes} likes</Text>
                {/* <Text className='text-white pl-2' style={{fontFamily: 'Montserrat-Regular', fontSize: 13}}>{likes && likes} likes</Text> */}
            </View>
            <View className='items-start justify-between mb-3 pb-3' style={{width: width * 0.94, borderBottomColor: '#282828', borderBottomWidth: 1}}>
                <View className='flex-row items-center justify-between' style={{width: width * 0.94}}>
                    <Text className='text-white text-sm pl-2 mt-1' numberOfLines={2} style={{fontFamily: 'Montserrat-Regular', width: width * 0.83, lineHeight: 23}}>{title && title}</Text>
                    <AntDesign name="hearto" size={15} color="white" /> 
                </View>
                <View className='flex-row items-center justify-between mt-2 mb-1'>
                    {subComments && subComments != 'None' ?
                        <TouchableOpacity className='ml-2 mr-1 py-1' onPress={() => setThreadToggle(!threadToggle)}>
                            <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Regular'}}>See More</Text>
                        </TouchableOpacity>    
                    : null}  
                    <TouchableOpacity className='ml-2 py-1'>
                        <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Regular'}}>Reply</Text>
                    </TouchableOpacity>
                </View>  
            </View>
            {threadToggle ? (
                <View  className='items-end mb-5' style={{width: width * 0.94, borderBottomColor: '#323232', borderBottomWidth: 2}}>
                    {subComments && subComments.map((item) => (
                        
                            <PostThreadComment key={item.id} commentText={item.commentText} likes={item.likes}/>
                        
                    ))}
                    </View>
                    
                
            ) : null }
        </>
    )
}

export default PostBlockComment