import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../core/theme';
const HorizontalLine = ({ percentageWidth }) => {
  return <View style={[styles.line, { width: `${percentageWidth}%` }]} />;
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 1,
    
    // position: 'absolute',
    // left: 0,
    // right: 0,
    marginVertical: 15,

  },
});

export default HorizontalLine;
