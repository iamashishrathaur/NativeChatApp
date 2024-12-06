import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import imagePath from '@/constants/imagePath'

const DefaultUser = () => {
  return (
    <View style={styles.avatar}>
        <Image source={imagePath.avatar} height={100} width={100} resizeMode='cover'/>
     </View>
  )
}

export default DefaultUser

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C2C4C3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 24,
    color: '#444',
    fontWeight: 'bold',
  },
})