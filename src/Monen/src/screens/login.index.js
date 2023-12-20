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
import {KeyboardAvoidingView} from 'react-native'
import SocialGroup from '../components/SocialGroup'
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <KeyboardAvoidingView  style={styles.container}>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <BackButton  />

      {/* <Logo /> */}
      <Header>Welcome back.</Header>
      <Text style={styles.subheader}>Sign in with your email and password</Text>
      <TextInput
        content="email"
        placeholder="Enter your Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        
      />
      <TextInput
        content="password"
        placeholder="Enter Your Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" style={styles.button} onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={{color: theme.colors.secondary}}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text  style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.social}>or Login with</Text>
      <SocialGroup />
    </KeyboardAvoidingView >
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
    backgroundColor: 'black',
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