// StatCard.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomText from "../Text/CustomText";
import { dark_gray, white, borderColor } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const DeckCard = ({
  deckName,
  deckDescription,
  userName,
  createDate,
  profilePictureSource,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <CustomText style={styles.topLeftText}>{deckName}</CustomText>
        <CustomText style={styles.bodyText}>{deckDescription}</CustomText>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.creatorContainer}>
          <Image source={profilePictureSource} style={styles.profilePicture} />
          <CustomText style={styles.userNameText}>{userName}</CustomText>
        </View>
        <CustomText style={styles.dateText}>{createDate}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: dark_gray,
    borderRadius: 10,
    margin: 3,
    padding: 10,
    borderColor: borderColor,
    height: 150,
    width: 210,
    alignSelf: "stretch", // Ensures the card stretches to fill its container
  },
  contentContainer: {
    flex: 1, // Take up remaining space in the card
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginBottom: -20,
  },
  topLeftText: {
    fontSize: 22,
    fontFamily: "Montserrat_700Bold",
  },
  bodyText: {
    textAlign: "left",
    fontSize: 15,
    color: "white",
    fontFamily: "Montserrat_300Light",
    paddingRight: 12,
  },
  userNameText: {
    fontSize: 14,
    color: "white",
    fontFamily: "Montserrat_300Light",
    paddingRight: 12,
  },
  dateText: {
    fontSize: 14,
    color: "white",
    fontFamily: "Montserrat_300Light",
    textAlign: "right",
  },
  creatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
    borderColor: "white",
    borderWidth: 0.4,
  },
});

export default DeckCard;
