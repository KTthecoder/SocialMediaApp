import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')

const KeyboardAvoidWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}} {...(Platform.OS === 'ios'
    ? {
        behavior: 'padding' ,
      }
    : {
        behavior: 'height',
    })}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', width: width }} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          style={{backgroundColor: '#111'}}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidWrapper