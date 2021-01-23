import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { getApparatusIds } from 'harpparts'
import { Entypo } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { OptionItem } from '../option-item'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import type { MenuProps, OptionProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataByApparatusForDispatcher } from './utils'

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
      <OptionItem
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
