import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CardDataWidget from "components/Card/CardDataWidget";

const CardListEdit = ({ route }) => {
  const { cards, setCards } = route.params;
  const navigation = useNavigation();
  const [newCards, setNewCards] = useState(cards);
  const [scrollViewKey, setScrollViewKey] = React.useState(0);

  const handleCardChange = (index, updatedCard) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], ...updatedCard };
    setCards(updatedCards);
    setNewCards(updatedCards);
    console.log("Updated Cards:", updatedCards);
  };

  const handleCardClick = () => {
    navigation.goBack();
  };

  const addCard = () => {
    const newCard = { question: "", answer: "" };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    setNewCards(updatedCards);
    setScrollViewKey((prevKey) => prevKey + 1);
  };

  const renderCardWidgets = () => {
    console.log("Render");
    return newCards.map((card, index) => (
      <CardDataWidget
        key={index}
        question={card.question}
        answer={card.answer}
        onChange={(updatedCard) => handleCardChange(index, updatedCard)}
        index={index}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.returnView}>
        <TouchableOpacity onPress={handleCardClick}>
          <FontAwesomeIcon
            icon="fa-sign-out fa-flip-horizontal"
            color={"white"}
            size={26}
            style={{ transform: [{ rotateY: "180deg" }] }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={addCard}>
          <FontAwesomeIcon icon="fa-plus" color={"white"} size={26} />
        </TouchableOpacity>
      </View>
      <ScrollView key={scrollViewKey}>{renderCardWidgets()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 100,
  },
  returnView: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CardListEdit;
