import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'
import SocialGroup from '../components/SocialGroup'
// import OTPInputView from '@twotalltotems/react-native-otp-input'
import { OtpInput } from "react-native-otp-entry";

export default function OtwScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }
        navigation.navigate('NewPasswordScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <BackButton goBack={navigation.goBack} /> */}
            <BackButton />
            <Logo />
            <Header>Restore Password</Header>
            <OtpInput
                numberOfDigits={4}
                focusColor="white"
                focusStickBlinkingDuration={500}
                onTextChange={(text) => console.log(text)}
                onFilled={(text) => console.log(`OTP is ${text}`)}
                theme={{
                    containerStyle: styles.OTPcontainer,
                    // inputsContainerStyle: styles.inputsContainer,
                    pinCodeContainerStyle: styles.pinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText,
                    // focusStickStyle: styles.focusStick,
                    focusedPinCodeContainerStyle: styles.activePinCodeContainer
                }}
            />

            <Button
                mode="contained"
                onPress={sendResetPasswordEmail}
                style={styles.button}
            >
                Send Instructions
            </Button>
            <View style={styles.row}>
                <Text style={{ color: theme.colors.secondary }}>Back to </Text>
                <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.social}>Or via social media</Text>
            <SocialGroup />
            <Text style={styles.signup}>Do you have an account?</Text>
            <Button
                mode="contained"
                onPress={sendResetPasswordEmail}
                style={styles.button}
            >
                Sign up
            </Button>
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
    button: {
        backgroundColor: '#191919',
        fontFamily: "Montserrat_400Regular",
    },
    social: {
        fontSize: 15,
        color: theme.colors.secondary,
        marginVertical: 10,
        fontFamily: "Montserrat_400Regular",
    },
    row: {
        flexDirection: 'row',
        marginVertical: 15,
        fontFamily: "Montserrat_400Regular",
        justifyContent: 'center',
        alignItems: 'center',

    },
    link: {
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "Montserrat_400Regular",

    },
    signup: {
        fontSize: 15,
        color: theme.colors.secondary,
        fontFamily: "Montserrat_400Regular",
        marginTop: 20,
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    OTPcontainer: {
        marginVertical: 20,
        // backgroundColor: "blue",
    },
    pinCodeContainer: {
        borderColor: "white",
    },
    activePinCodeContainer: {
        borderColor: "#03DAC6",
    },
    pinCodeText: {
        color: "white",
    }
})
