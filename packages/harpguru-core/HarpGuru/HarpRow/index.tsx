import React from 'react';
import {StyleSheet, View} from 'react-native';

import {HarpCell} from '../HarpCell';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'powderblue',
  },
});

export const HarpRow = () => {
  return (
    <View style={styles.row}>
      <HarpCell />
      <HarpCell />
      <HarpCell />
      <HarpCell />
      <HarpCell />
      <HarpCell />
      <HarpCell />
    </View>
  );
};
