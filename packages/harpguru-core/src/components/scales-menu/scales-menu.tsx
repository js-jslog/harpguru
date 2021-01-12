import { useDispatch } from 'reactn'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { getScale, getScaleIds } from 'harpparts'
import type { DegreeIds, Scale } from 'harpparts'
import { MaterialIcons } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import type { GlobalState } from '../../types'
import { colors, getSizes } from '../../styles'

import { rebufferForInput } from './utils'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()

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

  const scales = getScaleIds().map((id) => getScale(id))

  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <List scales={scales} tapHandler={(arg0) => rebufferForScale(arg0)} />
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
  const styles = StyleSheet.create({
    title: {
      alignSelf: 'center',
      fontSize: 64,
    },
  })

  return (
    <SafeAreaView>
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
