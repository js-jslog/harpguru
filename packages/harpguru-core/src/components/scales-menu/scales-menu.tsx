import { useGlobal } from 'reactn'
import React, { useCallback } from 'react'
import {
  getScale,
  getScaleByDegreeIds,
  getScaleIds,
  ScaleCategory,
} from 'harpparts'
import type { DegreeIds } from 'harpparts'
import { MaterialIcons } from '@expo/vector-icons'

import { OptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

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

  const scales = getScaleIds()
    .map((id) => getScale(id))
    .filter((scale) => scale.category === ScaleCategory.Scale)
  const chords = getScaleIds()
    .map((id) => getScale(id))
    .filter((scale) => scale.category === ScaleCategory.Chord)
  const titles = [scales, chords].map((list) =>
    list[0].category === ScaleCategory.Scale ? 'Scales' : 'Chords'
  )
  const itemsz = [scales, chords].map((list) => [
    // TODO: I think having a dedicated
    // clear all button would be better
    {
      label: 'Clear all',
      callbackParam: [],
    },
    ...list.map((item) => ({
      label: item.label,
      callbackParam: item.degrees,
    })),
  ])

  const optionStackPropsz = [
    {
      title: titles[0],
      useSubTitle,
      items: itemsz[0],
      itemTapHandler,
    },
    {
      title: titles[1],
      useSubTitle,
      items: itemsz[1],
      itemTapHandler,
    },
  ]
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <OptionStack optionPropsz={optionStackPropsz} />
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
