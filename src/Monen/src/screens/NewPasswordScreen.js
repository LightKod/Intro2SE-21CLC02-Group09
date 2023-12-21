import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { confirmPasswordValidator } from '../helpers/confirmPassword'
import {KeyboardAvoidingView} from 'react-native'
import SocialGroup from '../components/SocialGroup'
export default function NewPasswordScreen({ navigation }) {
    const [password, setPassword] = useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = useState({value: '',error: ''})
    const onNewPasswordPressed = () => {
      const passwordError = passwordValidator(password.value)
      const confirmPasswordError = confirmPasswordValidator(password.value,confirmPassword.value)
      if (emailError || passwordError || nameError) {
        setPassword({ ...password, error: passwordError })
        setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
        return
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    }

  return (
    <KeyboardAvoidingView  style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      {/* <BackButton  /> */}

      {/* <Logo /> */}
      <Header>Enter new password.</Header>
      <Text style={styles.subheader}>Sign in with your email and password</Text>
      <TextInput
        content="Password"
        placeholder="At least 8 characters"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        content="confirm Password"
        placeholder="confirm your Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
     
      <Button mode="contained" style={styles.button} onPress={onNewPasswordPressed}>
        Login
      </Button>
      
      <Text style={styles.social}>or via social media</Text>
      <SocialGroup />
    </KeyboardAvoidingView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#000000",
    fontFamily: "Montserrat_400Regular",

  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    fontFamily: "Montserrat_400Regular",
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    paddingBottom: 15,
    fontFamily: "Montserrat_400Regular",

  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontFamily: "Montserrat_400Regular",

  },
  link: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: "Montserrat_400Regular",

  },
  subheader:{
    fontSize: 15,
    color: theme.colors.secondary,
    fontFamily: "Montserrat_400Regular",

  },
  social:{
    fontSize: 15,
    color: theme.colors.secondary,
    marginVertical: 10,
    fontFamily: "Montserrat_400Regular",
  },
  button:{
    backgroundColor: '#191919',
    fontFamily: "Montserrat_400Regular",
  }

})