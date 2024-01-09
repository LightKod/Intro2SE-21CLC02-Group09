// DeckView.js
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import CardPreview from "components/DeckView/CardPreview";
import HorizontalScrollView from "components/Views/HorizontalScrollView";

const DeckView = ({ route }) => {
  const { deckData } = route.params;

  // Use deckData to render the DeckView screen
  const renderItem = ({ item }) => (
    <View style={{ width: Dimensions.get("window").width }}>
      <CardPreview {...item} />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
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
    marginTop: 20,
    height: 200,
  },
});
