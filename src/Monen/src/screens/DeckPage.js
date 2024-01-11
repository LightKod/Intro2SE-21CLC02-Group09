import React, { useState, useEffect } from "react";
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
import CustomText from "../components/Text/CustomText";
import UserProgress from "../components/Dashboard/UserProgress";
import DeckCard from "/components/Card/DeckCard";
import HorizontalScrollView from "components/Views/HorizontalScrollView";
import deckData from "../data/deckData";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import VerticalScrollView from "../components/Views/VerticalScrollView";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const DeckPage = () => {
  const profilePictureSource = require("../assets/tmp.png");
  const isFocused = useIsFocused();
  const handleMenuPress = () => {
    console.log("Menu button pressed!");
  };

  const [searchText, setSearchText] = useState("");
  const [filteredDecks, setFilteredDecks] = useState([]);
  const fetchDeckData = async () => {
    try {
      AsyncStorage.getItem("sessionCookie", (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const sessionCookie = result;
        console.log(sessionCookie);
        axios
          .get("https://flashcard-backend-kuup.onrender.com/decks", {
            headers: {
              Cookie: sessionCookie,
            },
          })
          .then((response) => {
            console.log(response.data);
            setFilteredDecks(response.data);
          })
          .catch((error) => {
            console.log("Error fetching deck data:", error);
          });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const DeckList = ({ data }) => {
    return (
      <React.Fragment>
        {data.map((item, index) => (
          <DeckCard key={index} {...item} deckData={item} />
        ))}
      </React.Fragment>
    );
  };
  useEffect(() => {
    // Filter decks based on search text
    const filtered = deckData.filter((deck) =>
      deck.deckName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDecks(filtered);
  }, [searchText]);
  useEffect(() => {
    // Fetch deck data on component mount
    fetchDeckData();
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        username="JohnDoe"
        profilePictureSource={profilePictureSource}
        onMenuPress={handleMenuPress}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.topSearch}>
          <SearchBar
            placeholder={"Search for a deck"}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity onPress={handleMenuPress} style={styles.addButton}>
            <FontAwesomeIcon icon="fa-plus" color={"white"} size={26} />
          </TouchableOpacity>
        </View>
        <DeckList data={filteredDecks} />
        <View style={styles.deckData}></View>
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
