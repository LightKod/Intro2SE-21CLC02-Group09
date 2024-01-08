import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import Header from "../components/Headers/MainHeader";
import { white, dark_gray } from "../constants/colors";
import SearchBar from "/components/SearchBar/SearchBar.index";
import CustomText from "../components/Text/CustomText/CustomText.index";
import UserProgress from "../components/Dashboard/UserProgress";
import DeckCard from "/components/Card/DeckCard";
import HorizontalScrollView from "components/Views/HorizontalScrollView";
import deckData from "../data/deckData";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import VerticalScrollView from "../components/Views/VerticalScrollView";

const DeckPage = () => {
  const profilePictureSource = require("../assets/tmp.png");

  const handleMenuPress = () => {
    // Add your logic for handling menu button press
    console.log("Menu button pressed!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        username="JohnDoe"
        profilePictureSource={profilePictureSource}
        onMenuPress={handleMenuPress}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.topSearch}>
          <SearchBar placeholder={"Search for a deck"} />
          <TouchableOpacity onPress={handleMenuPress} style={styles.addButton}>
            <FontAwesomeIcon icon="fa-plus" color={"white"} size={26} />
          </TouchableOpacity>
        </View>
        <VerticalScrollView
          data={deckData}
          renderItem={({ item }) => <DeckCard {...item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeckPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    fontFamily: "Montserrat_400Regular",
  },
  topSearch: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 0,
    flex: 1,
  },
  searchBar: {
    flex: 1,
  },
  addButton: {
    padding: 10,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: dark_gray,
    marginLeft: 10,
  },
  body: {
    padding: 15,
  },
});
