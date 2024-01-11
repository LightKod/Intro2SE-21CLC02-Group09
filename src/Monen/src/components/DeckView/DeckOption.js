import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CustomText from "components/Text/CustomText"; // Import your custom text component
import { white } from "constants/colors";

const DeckOption = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontAwesomeIcon
        icon={icon}
        color={white}
        size={20}
        style={styles.icon}
      />
      <CustomText style={styles.text}>{text}</CustomText>
    </TouchableOpacity>
  );
};

export default DeckOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#1E1E1E", // Set your desired background color
    marginVertical: 5,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: white,
    fontFamily: "Montserrat_700Bold",
  },
});
