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
import { useNavigation } from "@react-navigation/native";

const Learn = ({ route }) => {
  const { deckData } = route.params;
  const navigation = useNavigation();

  const handBackPress = () => {
    // Add your logic for handling menu button press
    console.log("Back button pressed!");
    navigation.navigate("DeckPage");
  };
  // Use deckData to render the DeckView screen
  const renderItem = ({ item }) => (
    <View style={{ width: Dimensions.get("window").width }}>
      <CardPreview {...item} />
    </View>
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  const onViewCallBack = React.useCallback((viewableItems) => {
    // console.log('Visible items are', viewableItems);
    // Use viewable items in state or as intended
    // console.log(viewableItems.viewableItems[0].index);
    setActiveIndex(viewableItems.viewableItems[0].index + 1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handBackPress} style={styles.backButton}>
          <FontAwesomeIcon icon="fa-arrow-left" color={"white"} size={20} />
        </TouchableOpacity>
        <Text style={styles.deckName}>{deckData.deckName}</Text>
        <Text style={styles.cardIndex}>
          Card {activeIndex} / {deckData.cards.length}
        </Text>
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
          onViewableItemsChanged={onViewCallBack}
        />
      </View>
    </SafeAreaView>
  );
};

export default Learn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    fontFamily: "Montserrat_400Regular",
  },
  deckPreview: {
    flex: 6,
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
