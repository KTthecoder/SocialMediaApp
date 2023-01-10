import { View, Text, ScrollView, SafeAreaView, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import SearchCategoryBlock from '../components/SearchCategoryBlock';
import SearchModalBlock1 from '../components/SearchModalBlock1';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet';

const AllResultsScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()
    const route = useRoute()

    const { data, isLoading } = useFetchGet(`http://192.168.1.34:8000/api/search/user/${route.params.search}/all`)

    return (
        <SafeAreaView className='w-screen justify-center items-center bg-[#141414] flex-1'>  
            <View className='justify-start items-center flex-row pb-2' style={{width: width * 0.94}}>
                <View className='flex-row'>
                    <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <Text className='text-white ml-1' style={{fontFamily: 'Montserrat-SemiBold', fontSize: 19}}>Found Profiles</Text>
            </View>
            <ScrollView className='flex-1 w-screen mt-3' contentContainerStyle={{alignItems: 'center', paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                {data && data.map((item) => (
                    <SearchModalBlock1 key={item.id} followers={item.userModel.followers} username={item.username} image={item.userModel.image} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AllResultsScreen