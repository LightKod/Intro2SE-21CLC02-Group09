import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { white, dark_gray, borderColor } from "constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SearchBar = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={"fa-search"} color="white" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="grey"
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
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
    borderColor: borderColor,
    flex: 1,
  },
  input: {
    color: white,
    marginLeft: 10,
    fontFamily: "Montserrat_400Regular",
    flex: 1,
  },
});

export default SearchBar;
