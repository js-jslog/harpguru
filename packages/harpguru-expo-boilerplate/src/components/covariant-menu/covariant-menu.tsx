import { useGlobal } from 'reactn'
import React from 'react'

import { Option } from '../option'
import { MenuContainer } from '../menu-container'
import { AnimatedMenuContainer } from '../animated-menu-container'
import { useNudgeDisplayMode } from '../../hooks'

import {
  useNudgeHarpStrataByHarpKey,
  useNudgeHarpStrataByPozition,
  useNudgeHarpStrataByRootPitch,
} from './hooks'

type CovariantMenuProps = {
  readonly onScreen: boolean
}

export const CovariantMenu = ({
  onScreen,
}: CovariantMenuProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')

  const { harpKeyId } = activeHarpStrata
  const nudgeHarpStrataByHarpKey = useNudgeHarpStrataByHarpKey()
  const harpKeyOptionProps = {
    title: 'Harp Key',
    optionId: harpKeyId,
    nudgeFunction: nudgeHarpStrataByHarpKey,
  }

  const { pozitionId } = activeHarpStrata
  const nudgeHarpStrataByPozition = useNudgeHarpStrataByPozition()
  const pozitionOptionProps = {
    title: 'Position',
    optionId: pozitionId,
    nudgeFunction: nudgeHarpStrataByPozition,
  }

  const { rootPitchId } = activeHarpStrata
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  const rootPitchOptionProps = {
    title: 'Position Key',
    optionId: rootPitchId,
    nudgeFunction: nudgeHarpStrataByRootPitch,
  }

  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const nudgeDisplayMode = useNudgeDisplayMode()
  const displayModeOptionProps = {
    title: 'Display',
    optionId: activeDisplayMode,
    nudgeFunction: nudgeDisplayMode,
  }

  return (
    <AnimatedMenuContainer onScreen={onScreen}>
      <MenuContainer>
        <Option {...harpKeyOptionProps} />
        <Option {...pozitionOptionProps} />
        <Option {...rootPitchOptionProps} />
        <Option {...displayModeOptionProps} />
      </MenuContainer>
    </AnimatedMenuContainer>
  )
}
