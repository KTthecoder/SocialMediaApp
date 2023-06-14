import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddPostScreen from '../screens/AddPostScreen'

const Stack = createNativeStackNavigator()

const AddPostStack = () => {

  return (
    <Stack.Navigator  screenOptions={{
      cardStyle: { backgroundColor: "transparent" },
      headerShown: false,
    }}>
      <Stack.Screen name='AddPostScreen' component={AddPostScreen} options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'modal'}}  /> 
    </Stack.Navigator>
  )
}

export default AddPostStack