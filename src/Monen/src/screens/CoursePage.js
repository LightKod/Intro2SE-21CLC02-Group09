import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Headers/MainHeader";
import { dark_gray } from "../constants/colors";
import SearchBar from "../components/SearchBar/SearchBar.index";
import courseData from "../data/courseData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CoursePage = () => {
  const profilePictureSource = require("../assets/tmp.png");
  const isFocused = useIsFocused();
  const [courseData, setCourseData] = useState([]);
  const handleMenuPress = () => {
    console.log("Menu button pressed!");
  };

  const [searchText, setSearchText] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const fetchCourseData = async () => {
    try {
      AsyncStorage.getItem("sessionCookie", (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const sessionCookie = result;
        console.log(sessionCookie);
        axios
          .get("https://flashcard-backend-kuup.onrender.com/courses", {
            headers: {
              Cookie: sessionCookie,
            },
          })
          .then((response) => {
            console.log(response.data.length);
            setCourseData(response.data);
            setFilteredCourses(response.data);
            setSearchText("");
          })
          .catch((error) => {
            console.log("Error fetching deck data:", error);
          });
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function CreateNewCourse() {
    try {
      AsyncStorage.getItem("sessionCookie", (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const sessionCookie = result;
        console.log(sessionCookie);
        const newDeckData = {
          title: "Course title",
          description: "Course description",
          decks: [],
          studentId: [],
        };
        axios
          .post(
            "https://flashcard-backend-kuup.onrender.com/courses/create",
            newDeckData,
            {
              headers: {
                Cookie: sessionCookie,
              },
            }
          )
          .then((response) => {
            console.log("Deck created successfully:", response.data);
            setCourseData([...courseData, response.data]);
          })
          .catch((error) => {
            console.error("Error creating deck:", error.response.data);
          });
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const filtered = courseData.filter((course) =>
      course.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchText, courseData]);

  const navigation = useNavigation(); // Navigation hook

  // Function to handle when a course is clicked
  const handleCourseClick = (course) => {
    navigation.navigate("CourseDetail", { course: course });
  };

  useEffect(() => {
    // Fetch course data on component mount
    fetchCourseData();
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
            placeholder={"Search for a course"}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity onPress={CreateNewCourse} style={styles.addButton}>
            <FontAwesomeIcon icon="fa-plus" color={"white"} size={26} />
          </TouchableOpacity>
        </View>
        {filteredCourses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.course}
            onPress={() => handleCourseClick(course)} // Using the new function name
          >
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.description}>{course.description}</Text>
            <View style={styles.footer}>
              <View style={styles.creatorInfoContainer}>
                <Image source={profilePictureSource} style={styles.avatar} />
                <Text style={styles.creatorInfo}>{course.userName}</Text>
              </View>
              <Text style={styles.creationDate}>{course.createDate}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoursePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Entire background is black
    fontFamily: "Montserrat_400Regular",
  },
  topSearch: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 0,
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
  course: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#191919", // Gray background for each course card
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
  courseTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: -2,
    marginTop: -5,
    color: "#ffffff",
    fontFamily: "Montserrat_700Bold",
  },
  description: {
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
    marginBottom: -20,
    fontFamily: "Montserrat_300Light",
    textAlign: "right",
  },
});
