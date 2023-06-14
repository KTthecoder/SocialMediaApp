import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NotificationBlock from '../components/NotificationBlock';

const NotificationsScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <SafeAreaView className='w-screen justify-center items-center bg-[#141414] flex-1'>
            <View className='justify-start items-center flex-row pb-1' style={{width: width * 0.94}}>
                <View className='flex-row'>
                    <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <Text className='text-white text-xl ml-2' style={{fontFamily: 'Montserrat-SemiBold'}}>Notifications</Text>
            </View>
            <ScrollView className='flex-1 w-screen pt-2' contentContainerStyle={{alignItems: 'center', paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                <Text className='text-gray-300 text-xl justify-start mb-6 mt-1' style={{fontFamily: 'Montserrat-SemiBold', width: width * 0.94}}>Today</Text>
                <NotificationBlock type={'comment'} />
                <NotificationBlock type={'post'} />
                <NotificationBlock type={'comment'} />
                <NotificationBlock type={'comment'} />
                <NotificationBlock type={'post'} />
                <NotificationBlock type={'post'} />
                <Text className='text-gray-300 text-xl justify-start mb-6 mt-3' style={{fontFamily: 'Montserrat-SemiBold', width: width * 0.94}}>This Month</Text>
                <NotificationBlock type={'post'} />
                <NotificationBlock type={'comment'} />
                <NotificationBlock type={'post'} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default NotificationsScreen