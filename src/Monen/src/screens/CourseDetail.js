import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CourseDetail = ({ route }) => {
  const { course } = route.params;
  const profilePictureSource = require("../assets/tmp.png");
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Lessons');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Lessons':
        return renderDecks();
      case 'Members':
        return renderMembers();
      case 'Forum':
        return <Text>Content for Forum tab will go here.</Text>;
      default:
        return null;
    }
  };

  const renderMembers = () => {
    if (!course) {
      return <Text>No course data available.</Text>;
    }

    return (
      <FlatList 
        data={course.student}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberContainer}>
            <View style={styles.memberItem}>
              <Text style={styles.memberName}>{item.name}</Text>
              <Text style={styles.memberClass}>{"Class: " + item.class}</Text>
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
        data={course.decks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.deck} 
            onPress={() => {
              console.log("Deck clicked:", item.title);
              navigation.navigate('Learn', { deckData: item });
            }}
          >
            <Text style={styles.deckTitle}>{item.title}</Text>
            <Text style={styles.deckDescription}>{item.description}</Text>
            <View style={styles.footer}>
              <View style={styles.creatorInfoContainer}>
                <Image source={profilePictureSource} style={styles.avatar} />
                <Text style={styles.creatorInfo}>{item.userName || 'Unknown'}</Text>
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
    <View style={styles.container}>
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

      <View style={styles.tabContent}>
        {renderTabContent()}
      </View>

      {/* Plus Icon at Bottom Center */}
      <View style={styles.bottomIconContainer}>
        <TouchableOpacity style={styles.bottomIcon} onPress={toggleModal}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Enter Information:</Text>
            {/* Add your form or any other input components here */}
            <TouchableOpacity onPress={toggleModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  tabContent: {
    flex: 1,
    marginTop: 20,
  },
  memberItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  memberClass: {
    fontSize: 16,
    color: '#666',
  },
  memberContainer: {
    backgroundColor: '#191919',
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
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  bottomIcon: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 50,
  },
  plusIcon: {
    fontSize: 24,
    color: 'white',
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default CourseDetail;
