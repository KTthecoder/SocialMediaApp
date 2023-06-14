import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PostBlock from '../components/PostBlock';
import PostBlock1 from '../components/PostBlock1';
import useFetchGet from '../hooks/useFetchGet';

const FavoritePostsScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()
    const { data, isLoading, setChange, change } = useFetchGet('http://192.168.1.34:8000/api/post/favorite', true)

    if (isLoading){
        return (
            <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <SafeAreaView className='w-screen justify-center items-center bg-[#141414] flex-1'>
            <View className='justify-start items-center flex-row pb-2' style={{width: width * 0.94}}>
                <View className='flex-row'>
                    <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <Text className='text-white ml-1' style={{fontFamily: 'Montserrat-SemiBold', fontSize: 19}}>Favorite</Text>
            </View>
            <ScrollView className='flex-1 w-screen' contentContainerStyle={{alignItems: 'center', paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                {data && data[0] ? 
                    <PostBlock1 setChange={setChange} change={change} postId={data[0]['posts'].id} liked={'Yes'} biggestComment={data[0]['posts'].biggestComment} key={data[0]['id']} profileImage={data[0]['posts'].userImage} images={data[0]['posts'].image.image} username={data[0]['posts'].userName} location={data[0]['posts'].location} likes={data[0]['posts'].likes} commentsCount={data[0]['posts'].commentsCount} description={data[0]['posts']['description']}/> : null}
                {data && data[1] ? data[1].map((item, key) => (
                    <PostBlock setChange={setChange} change={change} key={key} postId={item['posts'].id} liked={'Yes'} biggestComment={item['posts'].biggestComment} images={item['posts'].image.image} profileImage={item['posts'].userImage} username={item['posts'].userName} location={item['posts'].location} likes={item['posts'].likes} commentsCount={item['posts'].commentsCount} description={item['posts']['description']}/>
                )) : 
                <View className='mt-5'>
                    <Text className='text-white text-base text-center' style={{fontFamily: 'Montserrat-Medium', width: width * 0.8, lineHeight: 30}}>You Don't Have Favorite Posts</Text>
                </View>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default FavoritePostsScreen