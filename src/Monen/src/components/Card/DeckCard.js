// StatCard.js
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../Text/CustomText";
import { dark_gray, white, borderColor } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const DeckCard = ({
  title,
  description,
  creatorId,
  createdAt,
  profilePictureSource,
  deckData,
}) => {
  const navigation = useNavigation();
  const handleCardClick = () => {
    console.log("DeckCard clicked!");
    navigation.navigate("DeckView", { deckData });
  };
  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleCardClick}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <CustomText style={styles.topLeftText}>{title}</CustomText>
          <CustomText style={styles.bodyText}>{description}</CustomText>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.creatorContainer}>
            <Image
              source={profilePictureSource}
              style={styles.profilePicture}
            />
            <CustomText style={styles.userNameText}>{creatorId}</CustomText>
          </View>
          <CustomText style={styles.dateText}>
            {formatDate(new Date(createdAt))}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
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
    alignSelf: "stretch", // Ensures the card stretches to fill its container
    marginBottom: 10,
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
