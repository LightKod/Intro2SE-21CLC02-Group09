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
import { white } from "../constants/colors";
import SearchBar from "components/SearchBar/SearchBar.index";
import CustomText from "../components/Text/CustomText";
import UserProgress from "../components/Dashboard/UserProgress";
import DeckCard from "../components/Dashboard/DeckCard";
import HorizontalScrollView from "components/Views/HorizontalScrollView";
import deckData from "../data/deckData";
const Dashboard = () => {
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
        <CustomText style={styles.welcomeText}>Welcome back!</CustomText>
        <SearchBar placeholder={"Learning something new today?"} />
        <CustomText style={styles.sectionText}>Your progress</CustomText>
        <UserProgress />
        <CustomText style={styles.sectionText}>Recently learn decks</CustomText>
        <HorizontalScrollView
          data={deckData}
          renderItem={({ item }) => <DeckCard {...item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <CustomText style={styles.sectionText}>
          What others are learning...
        </CustomText>
        <HorizontalScrollView
          data={deckData}
          renderItem={({ item }) => <DeckCard {...item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    fontFamily: "Montserrat_400Regular",
  },
  body: {
    padding: 15,
  },
  welcomeText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 28,
    color: white,
    marginBottom: 14,
  },
  sectionText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: white,
    marginTop: 24,
    marginBottom: 10,
  },
});
