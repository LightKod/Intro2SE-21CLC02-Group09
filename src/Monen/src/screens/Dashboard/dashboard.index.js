import React from "react";
import { View, Image, SafeAreaView, StyleSheet } from "react-native";
import Header from "components/Header/header.index"; // assuming the component is in the same directory

const Dashboard = () => {
  const profilePictureSource = require("assets/favicon.png"); // replace with your actual path

  const handleMenuPress = () => {
    // Add your logic for handling menu button press
    console.log("Menu button pressed!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        username="JohnDoe"
        profilePictureSource={profilePictureSource}
        onMenuPress={handleMenuPress}
      />
      {/* Add the rest of your screen content below */}
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {},
});
