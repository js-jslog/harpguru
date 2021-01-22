import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { getApparatusIds } from 'harpparts'
import { Entypo } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps, OptionTypes } from '../../types'
import type { OptionProps_Apparatus } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataByApparatusForDispatcher } from './utils'

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

  const optionStackPropsz: ReadonlyArray<OptionProps_Apparatus> = [
    {
      title: 'Tuning',
      useSubTitle,
      optionType: OptionTypes.Apparatus,
      items,
      twoColumns: false,
      itemTapHandler,
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
