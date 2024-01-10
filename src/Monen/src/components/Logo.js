import React from 'react'
import { Image, StyleSheet,Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Logo() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={()=>{navigation.navigate('HomePage')}}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
})