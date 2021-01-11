import { FlatList } from 'react-native-gesture-handler'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { getScale, getScaleIds } from 'harpparts'
import { MaterialIcons } from '@expo/vector-icons'

import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    title: {
      alignSelf: 'center',
      fontSize: 64,
    },
  })

  const scales = getScaleIds().map((id) => getScale(id))

  const List = () => {
    return (
      <SafeAreaView>
        <FlatList
          scrollEnabled={true}
          initialNumToRender={18}
          data={scales}
          renderItem={({ item }) => (
            <Text style={styles.title}>{item.label}</Text>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </SafeAreaView>
    )
  }

  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <List />
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
