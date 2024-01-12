import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";

import { dark_gray } from "../../constants/colors.js";

export default function Header({ onMenuPress }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the new username from AsyncStorage
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("userName");
        // Set the new username to state
        setUsername(storedUsername || "Default User");
      } catch (error) {
        console.error("Error fetching username from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/tmp.png")}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <FontAwesomeIcon icon="fa-bars" color={"white"} size={20} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    margin: 10,
    marginBottom: 0,
    marginTop: 5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  username: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
  menuButton: {
    padding: 10,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: dark_gray,
  },
  menuButtonText: {
    color: "black",
  },
});
