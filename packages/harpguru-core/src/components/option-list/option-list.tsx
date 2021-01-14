import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import type { DegreeIds, Scale } from 'harpparts'

import { getSizes } from '../../styles'

type ListProps = {
  readonly scales: ReadonlyArray<Scale>
  readonly tapHandler: (arg0: ReadonlyArray<DegreeIds>) => void
}

export const OptionList = ({
  scales,
  tapHandler,
}: ListProps): React.ReactElement => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    absolute: {
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    optionText: {
      alignSelf: 'center',
      fontSize: sizes['8'],
      lineHeight: sizes['10'],
    },
  })

  return (
    <View style={styles.absolute}>
      <SafeAreaView>
        <FlatList
          data={scales}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => tapHandler(item.degrees)}>
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </SafeAreaView>
    </View>
  )
}
