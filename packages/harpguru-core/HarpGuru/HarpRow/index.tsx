import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
});

export const HarpRow = () => {
  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text>Try editing me! 🎉</Text>
      </View>
      <View style={styles.cell}>
        <Text>Try editing me! 🎉</Text>
      </View>
    </View>
  );
};
