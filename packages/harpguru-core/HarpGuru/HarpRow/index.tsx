import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'powderblue',
  },
  cell: {
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
});

export const HarpRow = () => {
  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text>A</Text>
      </View>
      <View style={styles.cell}>
        <Text>Bb</Text>
      </View>
    </View>
  );
};
