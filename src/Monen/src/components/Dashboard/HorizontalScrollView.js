import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

const HorizontalScrollView = ({ data, renderItem, keyExtractor }) => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row", // Set the direction to horizontal
  },
});

export default HorizontalScrollView;
