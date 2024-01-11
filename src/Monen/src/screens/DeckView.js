// DeckView.js
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import CardPreview from "components/DeckView/CardPreview";
import { useNavigation } from "@react-navigation/native";
import HorizontalScrollView from "components/Views/HorizontalScrollView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { white, dark_gray } from "constants/colors";
import CustomText from "components/Text/CustomText";
import DeckOption from "components/DeckView/DeckOption";
import { ScrollView } from "react-native-gesture-handler";

const DeckView = ({ route }) => {
  const profilePictureSource = require("../assets/tmp.png");
  const { deckData } = route.params;
  const navigation = useNavigation();
  const handleCardClick = () => {
    navigation.navigate("DeckPage");
  };
  // Use deckData to render the DeckView screen
  const renderItem = ({ item }) => (
    <View
      style={{
        width: Dimensions.get("window").width,
      }}
    >
      <CardPreview {...item} />
    </View>
  );
  const Learn = () => {
    //Khoa route o day vo cai cua m lam gium t
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.returnView}>
        <TouchableOpacity onPress={handleCardClick}>
          <FontAwesomeIcon
            icon="fa-sign-out fa-flip-horizontal"
            color={"white"}
            size={26}
            style={{ transform: [{ rotateY: "180deg" }] }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.deckPreview}>
          <FlatList
            data={deckData.cards}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
            snapToInterval={Dimensions.get("window").width}
            snapToAlignment="center"
          />
        </View>
        <View style={styles.deckData}>
          <View style={styles.contentContainer}>
            <TextInput style={styles.topLeftText} value={deckData.deckName} />
            <TextInput
              style={styles.bodyText}
              value={deckData.deckDescription}
            />
          </View>
          <View style={styles.bottomRow}>
            <View style={styles.creatorContainer}>
              <Image
                source={profilePictureSource}
                style={styles.profilePicture}
              />
              <CustomText style={styles.userNameText}>
                {deckData.userName}
              </CustomText>
            </View>
          </View>
        </View>
        <View style={styles.options}>
          <DeckOption icon={"fa-pencil"} text={"Edit Cards"}></DeckOption>
          <DeckOption icon={"fa-book"} text={"Learn"}></DeckOption>
          <DeckOption icon={"fa-gamepad"} text={"Play"}></DeckOption>
          <DeckOption icon={"fa-trash"} text={"Delete"}></DeckOption>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeckView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    fontFamily: "Montserrat_400Regular",
  },
  returnView: {
    margin: 20,
  },
  deckPreview: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deckData: {
    backgroundColor: dark_gray,
    borderRadius: 10,
    margin: 3,
    padding: 10,
    height: 150,
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    marginTop: 30,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  options: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    flex: 1,
    marginTop: 30,
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
    color: white,
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
    color: white,
    fontFamily: "Montserrat_300Light",
    paddingRight: 12,
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
  backButton: {
    padding: 10,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: dark_gray,
    marginLeft: 20,
    marginTop: 20,
  },
  header: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  cardIndex: {
    color: white,
    fontSize: 20,
    position: "absolute",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 70,
  },
  deckName: {
    color: white,
    fontSize: 25,
    position: "absolute",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 30,
  },
});
