import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { getApparatusIds } from 'harpparts'
import { Entypo } from '@expo/vector-icons'

import { OptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataByApparatusForDispatcher } from './hooks'

export const LayoutMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()

  const items = getApparatusIds().map((id) => ({
    label: id,
    callbackParam: id,
  }))
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

  const optionStackPropsz = [
    {
      title: 'Tuning',
      useSubTitle,
      items,
      itemTapHandler,
    },
  ]
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <OptionStack optionPropsz={optionStackPropsz} />
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <Entypo name="cog" size={sizes['7']} color={colors.homeRowsColor} />
      </MenuOpenButton>
    </Menu>
  )
}
