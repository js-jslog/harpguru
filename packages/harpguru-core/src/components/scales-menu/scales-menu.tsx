import { useGlobal } from 'reactn'
import React, { useCallback } from 'react'
import { getScaleByDegreeIds } from 'harpparts'
import type { DegreeIds } from 'harpparts'
import { MaterialIcons } from '@expo/vector-icons'

import { OptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getOptionStackProps } from './utils'
import { useDispatchAndFlushScaleToggles } from './hooks'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()

  const useSubTitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const scaleLabel = getScaleByDegreeIds(activeDegreeIds)
    return scaleLabel || ''
  }, [useGlobal])
  const dispatchAndFlushScaleToggles = useDispatchAndFlushScaleToggles({
    isMenuStashed: menuProps.isMenuStashed,
  })
  const itemTapHandler = useCallback(
    (arg0: ReadonlyArray<DegreeIds>) => dispatchAndFlushScaleToggles(arg0),
    [dispatchAndFlushScaleToggles]
  )

  const optionStackProps = getOptionStackProps(useSubTitle, itemTapHandler)

  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <OptionStack {...optionStackProps} />
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
