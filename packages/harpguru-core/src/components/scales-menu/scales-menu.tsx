import { useGlobal } from 'reactn'
import React, { useCallback } from 'react'
import { getScaleByDegreeIds } from 'harpparts'
import type { DegreeIds } from 'harpparts'
import { MaterialIcons } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { OptionLabel } from '../option-label'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getOptionStackProps } from './utils'
import { useDispatchAndFlushScaleToggles } from './hooks'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()

  const useScalesTitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: scaleLabel } = getScaleByDegreeIds(activeDegreeIds) || {}
    return (
      <OptionLabel
        title={'Scales'}
        subtitle={scaleLabel || ''}
        alignItems={'flex-start'}
        labelIsTitle={true}
      />
    )
  }, [useGlobal])
  const useChordsTitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: scaleLabel } = getScaleByDegreeIds(activeDegreeIds) || {}
    return (
      <OptionLabel
        title={'Chords'}
        subtitle={scaleLabel || ''}
        alignItems={'flex-start'}
        labelIsTitle={true}
      />
    )
  }, [useGlobal])
  const dispatchAndFlushScaleToggles = useDispatchAndFlushScaleToggles({
    isMenuStashed: menuProps.isMenuStashed,
  })
  const itemTapHandler = useCallback(
    (arg0: ReadonlyArray<DegreeIds>) => dispatchAndFlushScaleToggles(arg0),
    [dispatchAndFlushScaleToggles]
  )

  const optionStackProps = getOptionStackProps(
    useScalesTitle,
    useChordsTitle,
    itemTapHandler
  )

  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <MemoOptionStack {...optionStackProps} />
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <MaterialIcons
          name="linear-scale"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
