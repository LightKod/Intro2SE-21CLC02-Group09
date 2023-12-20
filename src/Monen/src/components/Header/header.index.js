import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";

import { dark_gray } from "constants/colors.js";

const Header = ({ username, profilePictureSource, onMenuPress }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.profileContainer}>
        <Image source={profilePictureSource} style={styles.profilePicture} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <FontAwesomeIcon icon="fa-bars" color={"white"} size={20} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    marginTop: 20,
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
    borderWidth: 2,
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

export default Header;