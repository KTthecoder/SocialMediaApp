import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import SearchCategoryBlock from '../components/SearchCategoryBlock';
import { useNavigation } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet';
import { ScrollView } from 'react-native-virtualized-view'

const SearchScreen = () => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()

  const { data, isLoading } = useFetchGet('http://192.168.1.34:8000/api/search')

  if (isLoading){
    return (
      <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
          <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <SafeAreaView className='w-screen justify-center items-center bg-[#141414] flex-1'>  
      <View className='pb-5'>
        <TouchableOpacity onPress={() => navigation.navigate('SearchModalScreen')} className='flex-row bg-[#242424] rounded-xl items-center justify-between mt-1' style={{width: width * 0.94, height: 45}}>
          <View className='items-center justify-end' style={{width: '13%'}}>
            <AntDesign name="search1" size={24} color="white" />
          </View>
          <View placeholder='Search in photoApp' className='rounded-r-xl justify-center' style={{width: '87%', height: 45}}>
            <Text style={{color: 'gray'}}>Search in photoApp</Text>
          </View>
        </TouchableOpacity>
      </View> 
      <ScrollView className='flex-1 w-screen' contentContainerStyle={{alignItems: 'center', paddingBottom: 100}} showsVerticalScrollIndicator={false}>
        <View className='justify-between flex-wrap flex-row' style={{width: width * 0.94}}> 
          <FlatList
            nestedScrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text className='text-white justify-start mt-2 mb-2' style={{fontFamily: 'Montserrat-SemiBold', width: width * 0.94, fontSize: 19}}>Your Favorite</Text>}
            data={data['Favorites']}
            renderItem={({ item }) => (
              <SearchCategoryBlock title={item.categoryModel.title} image={item.categoryModel.image} slug={item.categoryModel.slug} key={item.id}/>
            )}
            key={(item) => item.id}
            numColumns={2}
            listKey={1}
            columnWrapperStyle={{justifyContent: 'space-between', width: width * 0.94}}
          />  
        </View>
        <View className='justify-between flex-wrap flex-row' style={{width: width * 0.94}}>
          <FlatList
            nestedScrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text className='text-white justify-start mt-5 mb-2' style={{fontFamily: 'Montserrat-SemiBold', width: width * 0.94, fontSize: 19}}>All Categories</Text>}
            data={data['AllCategories']}
            renderItem={({ item }) => (
              <SearchCategoryBlock title={item.title} image={item.image} slug={item.slug} key={item.id}/>
            )}
            key={(item) => item.id}
            listKey={2}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between', width: width * 0.94}}
          /> 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen