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
} from "react-native";
import CardPreview from "components/DeckView/CardPreview";
import HorizontalScrollView from "components/Views/HorizontalScrollView";
import { white, dark_gray } from "../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


const DeckView = ({ route }) => {
  const { deckData } = route.params;
  const handBackPress = () => {
    // Add your logic for handling menu button press
    console.log("Back button pressed!");
  };
  // Use deckData to render the DeckView screen
  const renderItem = ({ item }) => (
    <View style={{ width: Dimensions.get("window").width }}>
      <CardPreview {...item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handBackPress} style={styles.backButton}>
          <FontAwesomeIcon icon="fa-arrow-left" color={"white"} size={20} />
        </TouchableOpacity>
        <Text style={styles.deckName}>{deckData.deckName}</Text>
      </View>
      <View style={styles.deckPreview}>
        <FlatList
          data={deckData.cards}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={Dimensions.get("window").width}
          snapToAlignment="center"
        />
      </View>
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
  deckPreview: {
    flex: 8,
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
  deckName: {
    color: white,
    fontSize: 25,
    position: "absolute",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 30,
  }
});
