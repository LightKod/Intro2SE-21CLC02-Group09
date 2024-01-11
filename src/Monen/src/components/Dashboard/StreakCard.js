// StreakCard.js
import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../Text/CustomText";
import { yellow, dark_gray, white, borderColor } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const StreakCard = ({ day }) => {
  return (
    <View style={styles.firstRow}>
      <FontAwesomeIcon icon={"fa-fire"} color={yellow} size={24} />
      <CustomText style={styles.streakText}>{day} Days STREAK!</CustomText>
      <FontAwesomeIcon icon={"fa-fire"} color={yellow} size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  firstRow: {
    flex: 3,
    justifyContent: "center",
    backgroundColor: dark_gray,
    alignItems: "center",
    borderRadius: 8,
    margin: 2,
    flexDirection: "row",
    borderColor: borderColor,
    marginBottom: 4,
  },
  streakText: {
    fontSize: 24,
    fontFamily: "Montserrat_800ExtraBold",
    color: yellow,
    marginHorizontal: 10,
  },
});

export default StreakCard;
