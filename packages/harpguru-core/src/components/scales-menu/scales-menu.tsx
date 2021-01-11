import { FlatList } from 'react-native-gesture-handler'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
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
      fontSize: 64,
    },
  })

  const data = [
    { id: 'one', title: 'item one' },
    { id: 'two', title: 'item two' },
    { id: 'three', title: 'item three' },
    { id: 'four', title: 'item four' },
    { id: 'five', title: 'item five' },
    { id: 'six', title: 'item six' },
    { id: 'seven', title: 'item seven' },
    { id: 'eight', title: 'item eight' },
    { id: 'nine', title: 'item nine' },
    { id: 'ten', title: 'item ten' },
    { id: 'eleven', title: 'item eleven' },
    { id: 'twelve', title: 'item twelve' },
    { id: 'thirteen', title: 'item thirteen' },
    { id: 'fourteen', title: 'item fourteen' },
    { id: 'fifteen', title: 'item fifteen' },
    { id: 'sixteen', title: 'item sixteen' },
    { id: 'seventeen', title: 'item seventeen' },
    { id: 'eighteen', title: 'item eighteen' },
  ]

  const List = () => {
    return (
      <SafeAreaView>
        <FlatList
          scrollEnabled={true}
          initialNumToRender={18}
          data={data}
          renderItem={({ item }) => (
            <Text style={styles.title}>{item.title}</Text>
          )}
          keyExtractor={(item) => item.id}
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
