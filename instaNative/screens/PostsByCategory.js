import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import PostBlock from '../components/PostBlock';
import PostBlock1 from '../components/PostBlock1';
import useFetchGet from '../hooks/useFetchGet';
import { ScrollView } from 'react-native-virtualized-view'

const PostsByCategory = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()
    const route = useRoute()
    const { data, isLoading, change, setChange } = useFetchGet(`http://192.168.1.34:8000/api/category/${route.params.slug}`)

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
                <Text className='text-white ml-1' style={{fontFamily: 'Montserrat-SemiBold', fontSize: 19}}>{data['Category'] && data['Category'].title}</Text>
            </View>
            <ScrollView className='flex-1 w-screen' contentContainerStyle={{alignItems: 'center', paddingBottom: 30}} showsVerticalScrollIndicator={false}>
                {data['First Post'] && data['First Post'] != null ? 
                    <PostBlock1 setChange={setChange} change={change} postId={data['First Post'].id} liked={data['First Post'].liked} biggestComment={data['First Post'].biggestComment} key={data['First Post']['id']} profileImage={data['First Post'].userImage} images={data['First Post'].image.image} username={data['First Post'].userName} location={data['First Post'].location} likes={data['First Post'].likes} commentsCount={data['First Post'].commentsCount} description={data['First Post']['description']}/>
                : null}
                {data['Posts'] && data['Posts'] != "No Posts In This Category" ? data['Posts'].map((item, key) => (
                    <PostBlock setChange={setChange} change={change} postId={item.id} liked={item.liked} key={key} biggestComment={item.biggestComment} images={item.image.image} profileImage={item.userImage} username={item.userName} location={item.location} likes={item.likes} commentsCount={item.commentsCount} description={item['description']}/>
                ))  :
                    <View className='mt-5'>
                        <Text className='text-white text-base text-center' style={{fontFamily: 'Montserrat-Medium', width: width * 0.8, lineHeight: 30}}>There are no posts in the {data['Category'] && data['Category'].title}</Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostsByCategory