// StatCard.js
import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../Text/CustomText/CustomText.index";
import { dark_gray, white, borderColor } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const StatCard = ({ topText, iconName, bottomText }) => {
  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <CustomText style={styles.topLeftText}>{topText}</CustomText>
        <FontAwesomeIcon icon={iconName} color={white} size={14} />
      </View>

      {/* Body Text */}
      <CustomText style={styles.bodyText}>{bottomText}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: dark_gray,
    borderRadius: 8,
    margin: 3,
    padding: 4,
    paddingLeft: 8,
    borderWidth: 0.3,
    borderColor: borderColor,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topLeftText: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
  },
  bodyText: {
    textAlign: "left",
    fontSize: 12,
    color: "white",
    fontFamily: "Montserrat_300Light",
    paddingRight: 12,
  },
});

export default StatCard;
