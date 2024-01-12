import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CustomText from "components/Text/CustomText"; // Import your custom text component
import { white, disableBackground, disableWhite } from "constants/colors";
import { dark_gray } from "../../constants/colors";

const DeckOption = ({ icon, text, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabledContainer]}
      onPress={onPress}
      disabled={disabled}
    >
      <FontAwesomeIcon
        icon={icon}
        color={white}
        size={20}
        style={[styles.icon, disabled && styles.disabledIcon]}
      />
      <CustomText style={[styles.text, disabled && styles.disabledText]}>
        {text}
      </CustomText>
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
    backgroundColor: dark_gray, // Set your desired background color
    marginVertical: 5,
    height: 50,
  },
  disabledContainer: {
    backgroundColor: disableBackground, // Set the background color for disabled state
  },
  icon: {
    marginRight: 10,
  },
  disabledIcon: {
    color: disableWhite, // Set the color for the icon in disabled state
  },
  text: {
    fontSize: 18,
    color: white,
    fontFamily: "Montserrat_700Bold",
  },
  disabledText: {
    color: disableWhite, // Set the color for the text in disabled state
  },
});
