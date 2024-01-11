import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
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
import { nameValidator } from '../helpers/nameValidator'
import { confirmPasswordValidator } from '../helpers/confirmPassword'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({value: '',error: ''})
  const saveCookies = async (cookieHeaderValue) => {
    if (cookieHeaderValue) {
      // Concatenate all cookies into a single string
      const connectSidValue = cookieHeaderValue[0].split(';')[0];
      console.log(connectSidValue)

      // Save the concatenated string in AsyncStorage
       await AsyncStorage.setItem('sessionCookie', connectSidValue, (error) => {
         if (error) {
           console.error('Error saving sessionCookie:', error);
         }
       })
       
    }
  };
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const confirmPasswordError = confirmPasswordValidator(password.value,confirmPassword.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
      return
    }
    axios.post('https://flashcard-backend-kuup.onrender.com/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    .then(response => {
      console.log('testtttt')
      // Handle successful response
      console.log('Login success:', response.data);
      // console.log(response.headers['set-cookie']);
      // Save the cookies in AsyncStorage
      saveCookies(response.headers['set-cookie']);

      // Redirect or perform other actions
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomePage' }],
      });
    })
    .catch(error => {
      // Handle error
      console.error('Login error:', error.response.data);
      // setErrLogin(error.response.data);
      // Display error message to the user if needed
      // ...
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      {/* <BackButton /> */}
      {/* <Logo /> */}
      <Header>Create Account Now</Header>
      <TextInput
        content="User Name"
        label="User Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        content="Email"
        label="Email"
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
        content="Password"
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        content="confirm Password"
        placeholder="confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={styles.button}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text style={{ color: theme.colors.secondary}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  row: {
    flexDirection: 'row',
    marginTop: 4,
    fontFamily: "Montserrat_400Regular",
    marginTop: 12,
  },
  link: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: "Montserrat_400Regular",
  },
  button:{
    backgroundColor: '#191919',
    fontFamily: "Montserrat_400Regular",
  },
})
