import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Switch,
} from "react-native";
import HorizontalLine from "../components/HorizontalLine";
import { theme } from "../core/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Header from "components/Headers/MainHeader";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export default function SettingScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    React.useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);
  const profilePictureSource = require("../assets/tmp.png");

  const handleMenuPress = () => {
    // Add your logic for handling menu button press
    console.log("Menu button pressed!");
  };

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Remove userId and sessionCookie from AsyncStorage
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("sessionCookie");

      // Navigate to StartScreen
      navigation.navigate("StartScreen");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        username="JohnDoe"
        profilePictureSource={profilePictureSource}
        onMenuPress={handleMenuPress}
      />
      <ScrollView style={styles.body}>
        <HorizontalLine percentageWidth={100} />
        <Text style={styles.textHeading}>Account Setting</Text>
        <View style={styles.row}>
          <Text style={styles.text}>Edit profile</Text>
          <Pressable onPress={() => {}}>
            <FontAwesomeIcon
              icon="fa-solid fa-chevron-right"
              color="white"
              size={20}
            />
          </Pressable>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Change password</Text>
          <Pressable onPress={() => {}}>
            <FontAwesomeIcon
              icon="fa-solid fa-chevron-right"
              color="white"
              size={20}
            />
          </Pressable>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Add a payment method</Text>
          <Pressable onPress={() => {}}>
            <FontAwesomeIcon icon="fa-solid fa-plus" color="white" size={20} />
          </Pressable>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Push notification</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isNotificationsEnabled ? "white" : "white"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              setIsNotificationsEnabled((previousState) => !previousState)
            }
            value={isNotificationsEnabled}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Dark mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkModeEnabled ? "white" : "white"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              setIsDarkModeEnabled((previousState) => !previousState)
            }
            value={isDarkModeEnabled}
          />
        </View>
        <HorizontalLine percentageWidth={100} />
        <Text style={styles.textHeading}>More</Text>
        <View style={styles.row}>
          <Text style={styles.text}>About us</Text>
          <Pressable onPress={() => {}}></Pressable>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Privacy policy</Text>
          <Pressable onPress={() => {}}></Pressable>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Report Bug</Text>
          <Pressable onPress={() => {}}></Pressable>
        </View>
        <Pressable
          onPress={() => {
            handleLogout();
          }}
        >
          <View style={styles.row}>
            <Text style={styles.text}>Logout</Text>

            <FontAwesomeIcon
              icon="fa-solid fa-sign-out"
              color="white"
              size={20}
            />
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    // alignItems: "center",
    fontFamily: "Montserrat_400Regular",
  },
  body: {
    flex: 1,
    // alignItems: "center",
    paddingHorizontal: 20,
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
  },
});
