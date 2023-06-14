import { View, Text, ScrollView, SafeAreaView, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import SearchModalBlock from '../components/SearchModalBlock';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store"

const SearchModalScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()
    const [data, setData] = useState('')
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    return (
        <SafeAreaView className='w-screen justify-center items-center bg-[#141414] flex-1'>  
            <View className='pb-5 mt-3'>
                <View className='flex-row bg-[#242424] rounded-xl items-center justify-between mt-1' style={{width: width * 0.94, height: 45}}>
                    <View className='items-center justify-end' style={{width: '13%'}}>
                        <AntDesign name="search1" size={24} color="white" />
                    </View>
                    <TextInput autoFocus={true} onChangeText={async(value) => {
                        if(value != ''){
                            await SecureStore.getItemAsync("accessToken").then(async(token) => {
                                setSearch(value)
                                let response = await fetch(`http://192.168.1.34:8000/api/search/user/${value}`, {
                                    method: "GET",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization' : 'Bearer ' + token
                                    },
                                })
                                let data = await response.json()
                                setData(data)
                                setIsLoading(false)
                            })           
                        }   
                        if(value  === ''){
                            setData('')
                            setIsLoading(false)
                            setSearch('')
                        }                           
                    }}
                    placeholder='Search in photoApp' className='rounded-r-xl text-white' style={{width: '87%', height: 45}} placeholderTextColor={'gray'} />
                </View>
            </View> 
            <ScrollView className='flex-1 w-screen mt-1' contentContainerStyle={{alignItems: 'center', paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                {data && data != '' ? 
                <>
                    {data && data.map((item) => (
                        <SearchModalBlock key={item.id} followers={item.userModel.followers} username={item.username} image={item.userModel.image} />
                    ))}

                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                        setTimeout(() => {
                            navigation.navigate('AllResultsScreen', {search: search})
                        }, 10)
                    }} className='bg-blue-500 items-center justify-center rounded-xl mt-3' style={{width: 200, height: 45}}>
                        <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Medium'}}>See All Results</Text>
                    </TouchableOpacity> 
                </>    
                :null}
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchModalScreen