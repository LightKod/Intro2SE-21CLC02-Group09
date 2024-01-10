import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Switch } from "react-native";
import HorizontalLine from "../components/HorizontalLine";
import { theme } from '../core/theme'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Header from "../components/HeaderLa/header.index";
export default function SettingScreen() {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);
    const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);
    const profilePictureSource = require('../assets/tmp.png');

  const handleMenuPress = () => {
    // Add your logic for handling menu button press
    console.log("Menu button pressed!");
  };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                username="JohnDoe"
                profilePictureSource={profilePictureSource}
                onMenuPress={handleMenuPress}
            />
            <HorizontalLine percentageWidth={100} />
            <Text style={styles.textHeading}>Account Setting</Text>
            <View style={styles.row}>
                <Text style={styles.text}>Edit profile</Text>
                <Pressable onPress={() => { }}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" color="white" size={20} />
                </Pressable>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Change password</Text>
                <Pressable onPress={() => { }}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" color="white" size={20} />
                </Pressable>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Add a payment method</Text>
                <Pressable onPress={() => { }}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" color="white" size={20} />
                </Pressable>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Push notification</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isNotificationsEnabled ? 'white' : 'white'}
                    // ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsNotificationsEnabled(previousState => !previousState)}
                    value={isNotificationsEnabled}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Dark mode</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDarkModeEnabled ? 'white' : 'white'}
                    // ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsDarkModeEnabled(previousState => !previousState)}
                    value={isDarkModeEnabled}
                />
            </View>
            <HorizontalLine percentageWidth={100} />
            <Text style={styles.textHeading}>More</Text>
            <View style={styles.row}>
                <Text style={styles.text}>About us</Text>
                <Pressable onPress={() => { }}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" color="white" size={20} />
                </Pressable>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Privacy policy</Text>
                <Pressable onPress={() => { }}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" color="white" size={20} />
                </Pressable>
            </View>
            {/* <HorizontalLine percentageWidth={100} /> */}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        // alignItems: "center",
        padding: 20,
        justifyContent: "center",
        fontFamily: "Montserrat_400Regular",
    },
    textHeading: {
        color: theme.colors.secondary,
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "Montserrat_400Regular",
        marginVertical: 10,
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "Montserrat_400Regular",
    },
    row: {
        flexDirection: "row",
        marginVertical: 15,
        justifyContent: "space-between",
        alignItems: "center",
    }
})