import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { white, dark_gray, borderColor } from "constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={"fa-search"} color="white" />
      <TextInput
        style={styles.input}
        placeholder="Learning something new today?"
        placeholderTextColor="grey"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: dark_gray,
    padding: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    borderWidth: 0.3,
    borderColor: borderColor,
  },
  input: {
    color: white,
    marginLeft: 10,
    fontFamily: "Montserrat_400Regular",
    flex: 1,
  },
});

export default SearchBar;
