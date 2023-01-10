import React from 'react'
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext()

const AuthProvider = (props) => {
    let [refreshToken, setRefreshToken] = useState(async () => await SecureStore.getItemAsync('refreshToken') ? await SecureStore.getItemAsync('refreshToken') : null)
    let [accessToken, setAccessToken] = useState(async () => await SecureStore.getItemAsync('accessToken') ? await SecureStore.getItemAsync('accessToken') : null)
    let [user, setUser] = useState(async () => await SecureStore.getItemAsync('accessToken') ? jwt_decode(await SecureStore.getItemAsync('accessToken')) : null)
    let [loading, setLoading] = useState(false)
    let [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation()

    async function loginUser(username, password) {
        let response = await fetch('http://192.168.1.34:8000/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        let data = await response.json()
        if(response.status == 200){
            setRefreshToken(data['refresh'])
            setAccessToken(data['access'])
            setUser(jwt_decode(data['access']))
            if(!await SecureStore.getItemAsync('refreshToken')){
                SecureStore.setItemAsync('refreshToken', data['refresh'])
            }
            if(!await SecureStore.getItemAsync('accessToken')){
                SecureStore.setItemAsync('accessToken', data['access'])
            }
                   
            GetToken()
        }
        else{
            alert("Something went wrong")
        }
    }

    async function logoutUser() {
        setRefreshToken(null)
        setAccessToken(null)
        setUser(null)
        await SecureStore.deleteItemAsync('refreshToken')
        await SecureStore.deleteItemAsync('accessToken')
        console.log("User Logged Out Correctly")
    }

    async function updateToken() {
        await SecureStore.getItemAsync("refreshToken").then(async(token) => {
            let response = await fetch('http://192.168.1.34:8000/api/token/refresh/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'refresh' : token
                })
            })
            let data = await response.json()
            if(response.status == 200){
                setAccessToken(data['access'])
                setUser(jwt_decode(data['access']))
                await SecureStore.setItemAsync('accessToken', data['access'])
                    
                GetToken()
            }
            else{
                // logoutUser()
                console.log(data)
            }

            if(loading){
                setLoading(false)
            }
        })
        
        // let data = await response.json()

        // if(response.status == 200){
        //     setAccessToken(data['access'])
        //     setUser(jwt_decode(data['access']))
        //     console.log('User is stil logged in')
        //     SecureStore.setItemAsync('accessToken', data['access'])
        // }
        // else{
        //     logoutUser()
        // }

        // if(loading){
        //     setLoading(false)
        // }
    }

    async function GetToken() {
        await SecureStore.getItemAsync("refreshToken").then((token) => {
            try{
                setRefreshToken(token)
                setIsLoading(false)
            }
            catch{
                console.log('Problem')
            }
        })

        await SecureStore.getItemAsync("accessToken").then((token) => {
            try{
                setAccessToken(token)
                setUser(jwt_decode(token))
                setIsLoading(false)
            }
            catch{
                console.log('Problem')
            }
        })
    }

    useEffect(() => {
        if(loading){
            updateToken()
        }

        let time = 200000
        let interval = setInterval(() => {
            if(accessToken){
                updateToken()
            }
        }, time)

        return () => clearInterval(interval)
    }, [accessToken, refreshToken, loading])

    const data = {
        refreshToken: refreshToken,
        accessToken: accessToken,
        loginUser: loginUser,
        user: user,
        loading: loading,
        logoutUser: logoutUser,
        GetToken: GetToken,
        isLoading: isLoading
    }

    useEffect(() => {
        GetToken()
    }, [accessToken])

    return (
        <AuthContext.Provider value={data}>
            {isLoading ? null : props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider