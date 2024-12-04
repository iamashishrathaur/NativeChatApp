import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Redirect, Stack } from 'expo-router'

const AuthLayout = () => {
    const [user, setUser] = useState(true)
    if (!user) {
        return <Redirect href="/home" />; 
      }
  return (
    <Stack>
       <Stack.Screen name='index' options={{headerShown:false}}/>
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})