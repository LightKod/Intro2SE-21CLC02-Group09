import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { theme } from '../core/theme'
import SocialGroup from '../components/SocialGroup'
export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Header>Monen</Header>
      <Text style={styles.paragraph}>
        Start your learning adventure today!
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="contained"
        style={styles.button}

        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
      <Text style={styles.social}>or via social media</Text>
      <SocialGroup />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph:
    {
      fontSize: 15,
      lineHeight: 21,
      textAlign: 'center',
      marginBottom: 12,
      fontFamily: "Montserrat_400Regular",
      color: theme.colors.secondary
    },
    button:{
      backgroundColor: '#191919',
      fontFamily: "Montserrat_400Regular",
    },
    social:{
      fontSize: 15,
      color: theme.colors.secondary,
      marginVertical: 10,
      fontFamily: "Montserrat_400Regular",
    },
})
