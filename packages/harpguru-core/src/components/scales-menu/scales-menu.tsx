import { useDispatch, useGlobal } from 'reactn'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { getScale, getScaleIds } from 'harpparts'
import type { DegreeIds, Scale } from 'harpparts'
import { MaterialIcons } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { FlushChannels, MenuProps } from '../../types'
import type { GlobalState } from '../../types'
import { colors, getSizes } from '../../styles'
import { useFlushBufferedActivityToggles } from '../../hooks'

import { rebufferForInput } from './utils'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()
  const [flushChannel, setFlushChannel] = useGlobal('flushChannel')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')

  const rebufferForScale = useDispatch(
    (
      global: GlobalState,
      _dipatch,
      targetActiveDegrees: ReadonlyArray<DegreeIds>
    ): Pick<GlobalState, 'bufferedActivityToggles'> => {
      const { activeHarpStrata } = global
      const { activeDegreeIds } = activeHarpStrata

      return {
        bufferedActivityToggles: rebufferForInput(
          activeDegreeIds,
          targetActiveDegrees
        ),
      }
    }
  )

  const { isMenuStashed } = menuProps

  useEffect(() => {
    if (!isMenuStashed) {
      setFlushChannel(FlushChannels.ScalesMenu)
    } else {
      setFlushChannel(FlushChannels.Regular)
    }
  }, [isMenuStashed, setFlushChannel])

  const flushBufferedActivityToggles = useFlushBufferedActivityToggles()
  useEffect(() => {
    if (flushChannel !== FlushChannels.ScalesMenu) return
    if (bufferedActivityToggles.length === 0) return
    flushBufferedActivityToggles()
  }, [bufferedActivityToggles, flushChannel])

  const scales = getScaleIds().map((id) => getScale(id))

  const styles = StyleSheet.create({
    titlesection: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      transform: [{ rotate: '-90deg' }],
    },
    titlewrapper: {
      paddingBottom: sizes['10'],
      alignItems: 'center',
      // TODO: make this the width of the screen
      width: 1000,
    },
    titletext: {
      fontSize: sizes['9'],
    },
    listsection: {
      flex: 10,
    },
  })

  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <View style={styles.titlesection}>
          <View style={styles.titlewrapper}>
            <Text style={styles.titletext}>Scales</Text>
          </View>
        </View>
        <View style={styles.listsection}>
          <List scales={scales} tapHandler={(arg0) => rebufferForScale(arg0)} />
        </View>
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <MaterialIcons
          name="linear-scale"
          size={sizes['7']}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}

type ListProps = {
  readonly scales: ReadonlyArray<Scale>
  readonly tapHandler: (arg0: ReadonlyArray<DegreeIds>) => void
}

const List = ({ scales, tapHandler }: ListProps): React.ReactElement => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      alignSelf: 'center',
      fontSize: sizes['8'],
      lineHeight: sizes['10'],
    },
  })

  return (
    <SafeAreaView style={styles.container}>
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
  )
}
