import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Image, Dimensions, Button } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Formik } from 'formik'
import KeyboardAvoidWrapper from '../components/KeyboardAvoidWrapper'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from "expo-secure-store"
import * as FileSystem from 'expo-file-system';

const ChoosePostTypeScreen = () => {
    const ref1 = useRef()
    const ref2 = useRef()
    const { loginUser } = useContext(AuthContext)
    const navigation = useNavigation()

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    const [image, setImage] = useState(null)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted')
        })();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if (!result['canceled']) {
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
            setImage(base64)
        } else {
            alert('You did not select any image.');
        }
    }

    if (hasGalleryPermission === false){
        return <Text>No access to Internal Storage</Text>
    }

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
    })

    if (!fontsLoaded){
        return <ActivityIndicator size='large' />
    }

    const { width, height } = Dimensions.get('screen')

    return (
        <KeyboardAvoidWrapper>
        <SafeAreaView className='flex-1 justify-start items-center bg-[#141414]'>
            <View className='items-center'>
                <View className='flex-row items-center mt-4 mb-4 justify-center' style={{width: width * 0.94}}>
                    <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Create Post</Text>
                </View>
            </View>
            <Formik
                initialValues={{description: '', location: '', category: '', image: ''}}
                onSubmit={async (values) => {
                    await SecureStore.getItemAsync("accessToken").then(async(token) => {
                        fetch('http://192.168.1.34:8000/api/post/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization' : 'Bearer ' + token
                            },
                            body: JSON.stringify({
                                description: values.description,
                                location: values.location,
                                category: values.category,
                                user: user['user_id'],
                                image: image,
                            }),
                        })
                        .then((data) => data.json())
                        .then((data) => {
                            alert("Post Created Succesfully")
                            navigation.goBack()
                        })
                        .catch((err) => alert(err))
                    })
                    
                }}
            >
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <View className='justify-start w-screen pl-5 pr-5'>
                    <View className='justify-start w-sceeen flex-row items-center mt-4'>
                      <View className='border-b border-gray-400 w-screen flex-1 justify-center'>
                        <TextInput  
                            placeholder='Description'
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            blurOnSubmit={false}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                ref1.current.focus()
                            }}
                            placeholderTextColor={'gray'}
                            className='text-base pr-4 text-black'
                            style={{fontFamily: 'Montserrat-Regular', color: 'white', height: 55}}
                        />
                      </View>
                    </View>
                    <View className='justify-start w-sceeen flex-row items-center mt-5'>
                        <View className='border-b border-gray-400 w-screen flex-1 justify-between flex-row items-center '>
                            <TextInput  
                                placeholder='Location'
                                onChangeText={handleChange('location')}
                                onBlur={handleBlur('location')}
                                value={values.location}
                                blurOnSubmit={false}
                                returnKeyType='next'
                                ref={ref1}
                                onSubmitEditing={() => {
                                    ref2.current.focus()
                                }}
                                placeholderTextColor={'gray'}
                                className='text-base pr-4 text-black'
                                style={{fontFamily: 'Montserrat-Regular', color: 'white', height: 55}}
                            />
                        </View>
                    </View>
                    <View className='justify-start w-sceeen flex-row items-center mt-5'>
                        <View className='border-b border-gray-400 w-screen flex-1 justify-between flex-row items-center '>
                            <TextInput  
                                placeholder='Category'
                                onChangeText={handleChange('category')}
                                onBlur={handleBlur('category')}
                                value={values.category}
                                blurOnSubmit={false}
                                returnKeyType='next'
                                ref={ref2}
                                onSubmitEditing={() => {
                                    ref3.current.focus()
                                }}
                                placeholderTextColor={'gray'}
                                className='text-base pr-4 text-black'
                                style={{fontFamily: 'Montserrat-Regular', color: 'white', height: 55}}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => pickImage()} className='justify-center items-center bg-blue-500 pt-4 pb-4 rounded-md mt-8'>
                        <Text className='text-white font-bold text-base' style={{fontFamily: 'Montserrat-Medium'}}>Add Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit} className='justify-center items-center bg-green-500 pt-4 pb-4 rounded-md mt-8'>
                      <Text className='text-white font-bold text-base' style={{fontFamily: 'Montserrat-Medium'}}>Create Post</Text>
                    </TouchableOpacity>
                  </View>  
                )}
            </Formik>
        </SafeAreaView>
      </KeyboardAvoidWrapper>
    )
}

export default ChoosePostTypeScreen