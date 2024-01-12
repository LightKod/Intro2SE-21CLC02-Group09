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
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { white, dark_gray } from "constants/colors";
import CustomText from "components/Text/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "components/CustomModal";
import InputModal from "components/InputModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";

const CourseDetail = ({ route }) => {
  const { course } = route.params;
  //console.log(course);
  const profilePictureSource = require("../assets/tmp.png");
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Lessons");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState(course.title);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [deckData, setDeckData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!isSuccessModalVisible);
  };

  const [isInputModalVisible, setInputModalVisible] = useState(false);

  const toggleInputsModal = (inputValue) => {
    if (activeTab === "Lessons") {
      console.log("Add new deck: " + inputValue);
      if (typeof inputValue === "string" && inputValue !== "") {
        AddDeck(inputValue);
      }
    } else {
      console.log("Add new student: " + inputValue);
      if (typeof inputValue === "string" && inputValue !== "") {
        AddUser(inputValue);
      }
    }
    setInputModalVisible(!isInputModalVisible);
  };
  const AddUser = (addUserId) => {
    AsyncStorage.getItem("sessionCookie")
      .then((sessionCookie) => {
        return axios.post(
          "https://flashcard-backend-kuup.onrender.com/courses/addUser",
          { courseId: course.courseId, userId: addUserId },
          {
            headers: {
              Cookie: sessionCookie,
            },
          }
        );
      })
      .then((response) => {
        //console.log("Add user response:", response.data);
        setStudentData([...studentData, response.data]);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const AddDeck = (addUserId) => {
    AsyncStorage.getItem("sessionCookie")
      .then((sessionCookie) => {
        return axios.post(
          "https://flashcard-backend-kuup.onrender.com/courses/addDeck",
          { courseId: course.courseId, deckId: addUserId },
          {
            headers: {
              Cookie: sessionCookie,
            },
          }
        );
      })
      .then((response) => {
        console.log("Add user response:", response.data);
        //setDeckData([...deckData, response.data]);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const [description, setDescription] = useState(course.description);
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
    fetchStudentsData();
    fetchDecksData();
  }, []);

  const fetchStudentsData = async () => {
    try {
      AsyncStorage.getItem("sessionCookie", (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const sessionCookie = result;
        axios
          .get(
            `https://flashcard-backend-kuup.onrender.com/courses/${course.courseId}/users`,
            {
              headers: {
                Cookie: sessionCookie,
              },
            }
          )
          .then((response) => {
            data = JSON.stringify(response.data);
            console.log("Students: " + data);
            data = JSON.parse(data);
            setStudentData(data);
          })
          .catch((error) => {
            console.log("Error students data:", error);
          });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDecksData = async () => {
    try {
      AsyncStorage.getItem("sessionCookie", (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const sessionCookie = result;
        axios
          .get(
            `https://flashcard-backend-kuup.onrender.com/courses/${course.courseId}/allDeck`,
            {
              headers: {
                Cookie: sessionCookie,
              },
            }
          )
          .then((response) => {
            data = JSON.stringify(response.data);
            console.log("Deck: " + data);
            data = JSON.parse(data);
            setDeckData(data);
          })
          .catch((error) => {
            console.log("Error deck data:", error);
          });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = () => {
    navigation.goBack();
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "Lessons":
        return renderDecks();
      case "Members":
        return renderMembers();
      case "Forum":
        return <Text>Content for Forum tab will go here.</Text>;
      default:
        return null;
    }
  };

  async function UpdateCourse() {
    const updatedDeck = {
      courseId: course.courseId,
      title: title,
      description: description,
      studentId: course.studentId,
      decks: course.decks,
    };
    //console.log("Updated Deck:", updatedDeck);
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
            "https://flashcard-backend-kuup.onrender.com/courses/update",
            updatedDeck,
            {
              headers: {
                Cookie: sessionCookie,
              },
            }
          )
          .then((response) => {
            console.log("Deck update successfully:", response.data);

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

  const renderMembers = () => {
    if (!course) {
      return <Text>No course data available.</Text>;
    }
    console.log(studentData);
    return (
      <FlatList
        data={studentData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberContainer}>
            <View style={styles.memberItem}>
              <Text style={styles.memberName}>{item.name}</Text>
              <Text style={styles.memberClass}>{"ID: " + item.publicId}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No members available for this course.</Text>}
      />
    );
  };

  const renderDecks = () => {
    if (!course) {
      return <Text>No course data available.</Text>;
    }

    return (
      <FlatList
        data={deckData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deck}
            onPress={() => {
              console.log("Deck clicked:", item.title);
              navigation.navigate("Learn", { deckData: item });
            }}
          >
            <Text style={styles.deckTitle}>{item.title}</Text>
            <Text style={styles.deckDescription}>{item.description}</Text>
            <View style={styles.footer}>
              <View style={styles.creatorInfoContainer}>
                <Image source={profilePictureSource} style={styles.avatar} />
                <Text style={styles.creatorInfo}>
                  {item.userName || "Unknown"}
                </Text>
              </View>
              <Text style={styles.creationDate}>{item.createdAt}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No decks available for this course.</Text>}
      />
    );
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
        {course.creatorId === userId && (
          <TouchableOpacity onPress={UpdateCourse}>
            <FontAwesomeIcon icon="fa-check" color={"white"} size={26} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.deckData}>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.topLeftText}
            value={title}
            onChangeText={(text) => setTitle(text)}
            editable={course.creatorId === userId}
          />
          <TextInput
            style={styles.bodyText}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            numberOfLines={3}
            editable={course.creatorId === userId}
          />
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.creatorContainer}>
            <CustomText style={styles.userNameText}>
              {"CourseID: " + course.courseId}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Lessons" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Lessons")}
        >
          <Text style={styles.tabText}>Lessons</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Members" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Members")}
        >
          <Text style={styles.tabText}>Members</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Forum" && styles.activeTab]}
          onPress={() => setActiveTab("Forum")}
        >
          <Text style={styles.tabText}>Forum</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContent}>{renderTabContent()}</View>

      {/* Plus Icon at Bottom Center */}
      <View style={styles.bottomIconContainer}>
        <TouchableOpacity style={styles.bottomIcon} onPress={toggleInputsModal}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <InputModal
        isVisible={isInputModalVisible}
        message="Enter ID"
        onConfirm={toggleInputsModal}
      />
      <CustomModal
        isVisible={isSuccessModalVisible}
        message="Deck updated successfully!"
        onConfirm={toggleSuccessModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000000",
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    marginTop: 80,
  },
  description: {
    fontFamily: "Montserrat_300Light",
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  tabText: {
    color: "#ffffff",
    fontFamily: "Montserrat_400Regular",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
    fontWeight: "bold",
  },
  deck: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#191919",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  deckTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: -2,
    color: "#ffffff",
    fontFamily: "Montserrat_700Bold",
  },
  deckDescription: {
    fontSize: 15,
    marginBottom: 10,
    color: "#ffffff",
    fontFamily: "Montserrat_300Light",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  creatorInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  creatorInfo: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: "Montserrat_300Light",
  },
  creationDate: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "right",
    fontFamily: "Montserrat_300Light",
    marginBottom: -20,
  },
  tabContent: {
    flex: 1,
    marginTop: 20,
  },
  memberItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  memberClass: {
    fontSize: 16,
    color: "#666",
  },
  memberContainer: {
    backgroundColor: "#191919",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  bottomIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  bottomIcon: {
    backgroundColor: "#333",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  plusIcon: {
    fontSize: 30,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  returnView: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CourseDetail;
