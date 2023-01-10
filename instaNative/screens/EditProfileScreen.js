import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { AuthContext } from '../contexts/AuthContext';

const EditProfileScreen = () => {
    const { width, height } = Dimensions.get('screen')

    const navigation = useNavigation()

    const { logoutUser } = useContext(AuthContext)

    return (
        <SafeAreaView className='relative items-center' style={{height: height, width: width, backgroundColor: '#141414'}}>
            <View className='justify-between items-center flex-row pb-2' style={{width: width * 0.94}}>
                <View className='flex-row'>
                    <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className='text-white ml-1' style={{fontFamily: 'Montserrat-SemiBold', fontSize: 19}}>Edit Profile</Text>
                </View>
                <View className='flex-row' style={{opacity: 0}}>
                    <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='relative items-center mt-5' style={{width: width * 0.94}}>
                <TouchableOpacity onPress={() => logoutUser()} className='bg-blue-500 justify-center items-center rounded-xl' style={{width: '55%', height: 45}}>
                    <Text className='text-white text-sm text-center' style={{fontFamily: 'Montserrat-Medium'}}>Logout</Text>
                </TouchableOpacity> 
            </View>
        </SafeAreaView>
    )
}

export default EditProfileScreen