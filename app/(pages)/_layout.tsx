import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const PageLayout = () => {
  return (
    <Stack screenOptions={{animation:'ios_from_right'}}>
         <Stack.Screen name='home' options={{headerShown:false}}/>
         <Stack.Screen name='contact' options={{headerShown:false}}/>
         <Stack.Screen name='chat' options={{headerShown:false}}/>
         <Stack.Screen name='videocall' options={{headerShown:false,animation:'fade_from_bottom'}}/>
    </Stack>
  )
}

export default PageLayout