import { useDispatch } from 'reactn'
import React from 'react'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'
import { getApparatusIds } from 'harpparts'
import type { ApparatusIds } from 'harpparts'
import { Entypo } from '@expo/vector-icons'

import { OptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { DisplayModes, GlobalState, MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

export const LayoutMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()

  const items = getApparatusIds().map((id) => ({
    label: id,
    callbackParam: id,
  }))
  const itemTapHandler = React.useCallback(
    useDispatch(
      (
        global: GlobalState,
        _dipatch,
        apparatusId: ApparatusIds
      ): Pick<GlobalState, 'activeHarpStrata'> => {
        const { activeHarpStrata, activeDisplayMode } = global

        const newHarpStrataProps: HarpStrataProps = {
          ...getPropsForHarpStrata(
            activeHarpStrata,
            activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
          ),
          apparatusId,
        }
        return {
          activeHarpStrata: getHarpStrata(newHarpStrataProps),
        }
      }
    ),
    [useDispatch]
  )

  const optionStackPropsz = [
    {
      title: 'Tuning',
      items: items,
      itemTapHandler,
    },
  ]
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <OptionStack stackPropsz={optionStackPropsz} />
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <Entypo name="cog" size={sizes['7']} color={colors.homeRowsColor} />
      </MenuOpenButton>
    </Menu>
  )
}
