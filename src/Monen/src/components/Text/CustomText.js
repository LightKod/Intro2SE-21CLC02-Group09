import React from "react";
import { Text, StyleSheet } from "react-native";
import { white } from "constants/colors";
const CustomText = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat_400Regular",
    color: white,
  },
});

export default CustomText;
