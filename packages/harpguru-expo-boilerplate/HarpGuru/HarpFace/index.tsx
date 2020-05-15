import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const HarpFace = () => {
  return (
    <View style={styles.body}>
      <Text>Try editing me! 🎉</Text>
    </View>
  );
};
