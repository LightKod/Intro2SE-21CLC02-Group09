// DeckView.js
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import CardPreview from "components/DeckView/CardPreview";
import HorizontalScrollView from "components/Views/HorizontalScrollView";

const DeckView = ({ route }) => {
  const { deckData } = route.params;

  // Use deckData to render the DeckView screen

  return (
    <SafeAreaView>
      <View>
        <CardPreview {...deckData.cards[0]} />
      </View>
    </SafeAreaView>
  );
};

export default DeckView;
