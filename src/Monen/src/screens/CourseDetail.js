import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import courseData from '../data/courseData';  // Assuming you have imported your courseData

const CourseDetail = ({ route }) => {
  const { course } = route.params;
  const profilePictureSource = require("../assets/tmp.png");

  const [activeTab, setActiveTab] = useState('Lessons');

  useEffect(() => {

  }, [course]);

  const renderDecks = () => {
    if (!course) {
      return <Text>No course data available.</Text>;
    }

    if (activeTab === 'Lessons') {
      return (
        <FlatList 
          data={course.decks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.deck} 
              onPress={() => console.log("Deck clicked:", item.deckName)}
            >
              <Text style={styles.deckTitle}>{item.deckName}</Text>
              <Text style={styles.deckDescription}>{item.deckDescription}</Text>
              <View style={styles.footer}>
                <View style={styles.creatorInfoContainer}>
                  <Image source={profilePictureSource} style={styles.avatar} />
                  <Text style={styles.creatorInfo}>{item.userName || 'Unknown'}</Text>
                </View>
                <Text style={styles.creationDate}>{item.createDate}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>No decks available for this course.</Text>}
        />
      );
    } else {
      return <Text>Content for {activeTab} tab will go here.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.courseName}</Text>
      <Text style={styles.description}>{course.courseDescription}</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Lessons' && styles.activeTab]}
          onPress={() => setActiveTab('Lessons')}
        >
          <Text style={styles.tabText}>Lessons</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Members' && styles.activeTab]}
          onPress={() => setActiveTab('Members')}
        >
          <Text style={styles.tabText}>Members</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Forum' && styles.activeTab]}
          onPress={() => setActiveTab('Forum')}
        >
          <Text style={styles.tabText}>Forum</Text>
        </TouchableOpacity>
      </View>
      {renderDecks()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    marginTop: 80
  },
  description: {
    fontFamily: "Montserrat_300Light",
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  tabText: {
    color: '#ffffff',
    fontFamily: "Montserrat_400Regular",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    fontWeight: 'bold',
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
});

export default CourseDetail;
