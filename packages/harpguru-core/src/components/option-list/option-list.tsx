import Animated from 'react-native-reanimated'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
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
    flexissuer: {
      flexDirection: 'row',
    },
    absolute: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      alignSelf: 'center',
    },
    fullflex: {
      flex: 1,
    },
    title: {
      alignSelf: 'center',
      fontSize: sizes['8'],
      lineHeight: sizes['10'],
    },
  })

  return (
    <Animated.View style={styles.absolute}>
      <Animated.View style={styles.flexissuer}>
        <Animated.View style={styles.fullflex}>
          <SafeAreaView style={{}}>
            <FlatList
              data={scales}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => tapHandler(item.degrees)}>
                  <Text style={styles.title}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => `${item.id}`}
            />
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  )
}
