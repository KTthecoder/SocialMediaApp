import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import CachedImage from 'react-native-expo-cached-image'

const NotificationBlock = ({type}) => {
    const { width } = Dimensions.get('screen')

    return (
        <>
            {type === 'comment' ? (
                <View className='mb-4 flex-row pb-4 items-center' style={{width: width * 0.94, borderBottomColor: '#383838', borderBottomWidth: 1}}>
                    <CachedImage source={{cache: "force-cache", uri: `https://picsum.photos/200/300`}} className='rounded-full mr-4' style={{width: 45, height: 45}} />
                    <View style={{width: '80%'}}>
                        <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-SemiBold'}}>Ffodsfoidsjof</Text>
                        <Text className='text-white text-sm ' numberOfLines={2} style={{fontFamily: 'Montserrat-Regular'}}>Commented Your Post: lj dlsjfl jsdlf jsdlfj sdljf lsdjf lsdjfl sdjfls djlfj jfodsj fosjd ofjosid</Text>
                        <Text className='text-gray-500 text-sm mt-1' style={{fontFamily: 'Montserrat-SemiBold'}}>20-11-2022</Text>
                    </View>
                </View>
            ) : null}
            
            {type === 'post' ? (
                <View className='mb-4 flex-row pb-4 items-center' style={{width: width * 0.94, borderBottomColor: '#383838', borderBottomWidth: 1}}>
                    <CachedImage source={{cache: "force-cache", uri: `https://picsum.photos/200/300`}} className='rounded-full mr-4' style={{width: 45, height: 45}} />
                    <View style={{width: '80%'}}>
                        <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-SemiBold'}}>Ffodsfoidsjof</Text>
                        <Text className='text-white text-sm ' style={{fontFamily: 'Montserrat-Regular'}}>
                            Started Following You 
                            <Text className='text-gray-500 text-sm' style={{fontFamily: 'Montserrat-SemiBold'}}> 20-11-2022</Text>
                        </Text>
                    </View>
                </View>
            ) : null}   
        </>
    )
}

export default NotificationBlock