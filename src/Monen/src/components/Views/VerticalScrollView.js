import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

const VerticalScrollView = ({ data, renderItem, keyExtractor }) => {
  return (
    <FlatList
      horizontal={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column", // Set the direction to vertical
  },
});

export default VerticalScrollView;
