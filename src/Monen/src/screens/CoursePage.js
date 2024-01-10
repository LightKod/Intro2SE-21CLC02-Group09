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

const CoursePage = () => {
  const profilePictureSource = require("../assets/tmp.png");

  const handleMenuPress = () => {
    console.log("Menu button pressed!");
  };

  const [searchText, setSearchText] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courseData);

  useEffect(() => {
    const filtered = courseData.filter((course) =>
      course.courseName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchText]);

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
          <TouchableOpacity onPress={handleMenuPress} style={styles.addButton}>
            <FontAwesomeIcon icon="fa-plus" color={"white"} size={26} />
          </TouchableOpacity>
        </View>
        {filteredCourses.map((course, index) => (
          <View key={index} style={styles.courseCard}>
            <Text style={styles.courseTitle}>{course.courseName}</Text>
            <Text style={styles.courseDescription}>{course.courseDescription}</Text>
            <View style={styles.footer}>
              <View style={styles.creatorInfoContainer}>
                <Image source={profilePictureSource} style={styles.avatar} />
                <Text style={styles.creatorInfo}>{course.userName}</Text>
              </View>
              <Text style={styles.creationDate}>{course.createDate}</Text>
            </View>
          </View>
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
  courseCard: {
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
  courseDescription: {
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
