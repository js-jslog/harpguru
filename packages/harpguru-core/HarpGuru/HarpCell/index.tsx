import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  cell: {
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
});

export const HarpCell = () => {
  return (
    <View style={styles.cell}>
      <Text>A</Text>
    </View>
  );
};
