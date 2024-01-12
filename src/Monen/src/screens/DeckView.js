// DeckView.js
import React, { useState, useEffect } from "react";
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
  LogBox,
} from "react-native";
import CardPreview from "components/DeckView/CardPreview";
import { useNavigation } from "@react-navigation/native";
import HorizontalScrollView from "components/Views/HorizontalScrollView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { white, dark_gray } from "constants/colors";
import CustomText from "components/Text/CustomText";
import DeckOption from "components/DeckView/DeckOption";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import CustomModal from "components/CustomModal";
import axios from "axios";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const DeckView = ({ route }) => {
  const profilePictureSource = require("../assets/tmp.png");
  const { setDeckData, deckData } = route.params;
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState(deckData.title);
  const [description, setDescription] = useState(deckData.description);
  const [cards, setCards] = useState(deckData.cards);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!isSuccessModalVisible);
  };
  const navigation = useNavigation();
  const handleCardClick = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        setUserId(storedUserId || ""); // Set the user ID or an empty string if not found
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  async function UpdateDeck() {
    const updatedDeck = {
      deckId: deckData.deckId,
      title: title,
      description: description,
      cards: cards,
    };
    console.log("Updated Deck:", updatedDeck);
    try {
      AsyncStorage.getItem("sessionCookie", (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const sessionCookie = result;
        //console.log(sessionCookie);
        axios
          .post(
            "https://flashcard-backend-kuup.onrender.com/decks/deckUpdate",
            updatedDeck,
            {
              headers: {
                Cookie: sessionCookie,
              },
            }
          )
          .then((response) => {
            console.log("Deck update successfully:", response.data);
            setDeckData((prevDeckData) => {
              const updatedIndex = prevDeckData.findIndex(
                (deck) => deck.deckId === deckData.deckId
              );

              const newDeckData = [...prevDeckData];
              newDeckData[updatedIndex] = updatedDeck;

              return newDeckData;
            });
            toggleSuccessModal();
          })
          .catch((error) => {
            console.error("Error updating deck:", error.response.data);
          });
      });
    } catch (error) {
      console.error(error);
    }
  }

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
    navigation.navigate("DeckLearn", { deckData });
  };
  const Edit = () => {
    console.log(cards);
    navigation.navigate("CardListEdit", {
      cards,
      setCards,
    });
  };
  const Delete = async () => {
    const updatedDeck = {
      deckId: deckData.deckId,
    };
    try {
      AsyncStorage.getItem("sessionCookie", (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const sessionCookie = result;
        //console.log(sessionCookie);
        axios
          .post(
            "https://flashcard-backend-kuup.onrender.com/decks/delete",
            updatedDeck,
            {
              headers: {
                Cookie: sessionCookie,
              },
            }
          )
          .then((response) => {
            console.log("Deck delete successfully:", response.data);
            setDeckData((prevDeckData) => {
              // Use filter to create a new array without the deck to be removed
              const newDeckData = prevDeckData.filter(
                (deck) => deck.deckId !== updatedDeck.deckId
              );

              return newDeckData;
            });
            navigation.goBack();
          })
          .catch((error) => {
            console.error("Error deleting deck:", error.response.data);
          });
      });
    } catch (error) {
      console.error(error);
    }
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
        {deckData.userId === userId && (
          <TouchableOpacity onPress={UpdateDeck}>
            <FontAwesomeIcon icon="fa-check" color={"white"} size={26} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <View style={styles.deckPreview}>
          <FlatList
            data={cards}
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
            <TextInput
              style={styles.topLeftText}
              value={title}
              onChangeText={(text) => setTitle(text)}
              editable={deckData.userId === userId}
            />
            <TextInput
              style={styles.bodyText}
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              numberOfLines={3}
              editable={deckData.userId === userId}
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
          <DeckOption
            icon={"fa-pencil"}
            text={"Edit Cards"}
            onPress={Edit}
            disabled={userId !== deckData.userId}
          ></DeckOption>
          <DeckOption
            icon={"fa-book"}
            text={"Learn"}
            onPress={Learn}
          ></DeckOption>
          <DeckOption icon={"fa-gamepad"} text={"Play"}></DeckOption>
          <DeckOption
            icon={"fa-trash"}
            text={"Delete"}
            onPress={Delete}
          ></DeckOption>
        </View>
      </ScrollView>
      <CustomModal
        isVisible={isSuccessModalVisible}
        message="Deck updated successfully!"
        onConfirm={toggleSuccessModal}
      />
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
    flexDirection: "row",
    justifyContent: "space-between",
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
