import { useGlobal, useDispatch } from 'reactn'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native'
import React, { useCallback } from 'react'
import type { ApparatusIds } from 'harpparts'
import { getApparatusIds } from 'harpparts'
import { Entypo } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { getOptionStyles } from '../../utils'
import type { ListItemProps_Single, MenuProps, OptionProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataByApparatusForDispatcher } from './utils'

const ListItem = (
  props: ListItemProps_Single<ApparatusIds>
): React.ReactElement => {
  const styles = getOptionStyles()
  const textElement = props.isSelected ? (
    <Text style={[styles.optionText, { fontWeight: 'bold' }]}>
      {props.label}
    </Text>
  ) : (
    <Text style={styles.optionText}>{props.label}</Text>
  )
  return (
    <TouchableOpacity
      disabled={props.isSelected ? true : false}
      onPress={() => props.itemTapHandler(props.callbackParam)}
    >
      {textElement}
    </TouchableOpacity>
  )
}

export const LayoutMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()

  const useSubTitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const {
      apparatus: { id: apparatusId },
    } = activeHarpStrata
    return apparatusId
  }, [useGlobal])
  const itemTapHandler = useCallback(
    useDispatch(getNewHarpStrataByApparatusForDispatcher),
    [useDispatch]
  )
  const useItems = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const {
      apparatus: { id: apparatusId },
    } = activeHarpStrata
    const items = getApparatusIds().map((id, index) => (
      <ListItem
        key={`${index}`}
        label={id}
        isSelected={id === apparatusId}
        itemTapHandler={itemTapHandler}
        callbackParam={id}
        twoColumns={false}
      />
    ))
    return items
  }, [useGlobal])

  const optionStackPropsz: ReadonlyArray<OptionProps> = [
    {
      title: 'Tuning',
      useSubTitle,
      useItems: useItems,
      twoColumns: false,
    },
  ]
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <MemoOptionStack optionPropsz={optionStackPropsz} />
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <Entypo
          name="cog"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
