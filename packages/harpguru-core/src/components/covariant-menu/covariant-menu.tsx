import { useGlobal } from 'reactn'
import React from 'react'
import { getPitchIds, getPozitionIds } from 'harpparts'
import { CovariantMembers } from 'harpcovariance'
import { Feather } from '@expo/vector-icons'

import { OptionLock } from '../option-lock'
import { Option } from '../option'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import type { MenuProps, OptionIds } from '../../types'
import { colors } from '../../styles'
import { useSizes } from '../../hooks'

import {
  useNudgeHarpStrataByHarpKey,
  useNudgeHarpStrataByPozition,
  useNudgeHarpStrataByRootPitch,
  useSetHarpStrataByHarpKey,
  useSetHarpStrataByPozition,
  useSetHarpStrataByRootPitch,
} from './hooks'

export const CovariantMenu = (menuProps: MenuProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [lockedCovariant, setLockedCovariant] = useGlobal('lockedCovariant')

  const orderedPitchIds = getPitchIds()
  const orderedPozitionIds = getPozitionIds()

  const { harpKeyId } = activeHarpStrata
  const nudgeHarpStrataByHarpKey = useNudgeHarpStrataByHarpKey()
  const setHarpStrataByHarpKey = useSetHarpStrataByHarpKey()
  const harpKeyOptionProps = {
    title: 'Harp Key',
    activeOptionId: harpKeyId,
    orderedOptionIds: orderedPitchIds,
    nudgeFunction: nudgeHarpStrataByHarpKey,
    setFunction: setHarpStrataByHarpKey as (arg0: OptionIds) => void,
  }
  const harpKeyIsLocked = lockedCovariant === CovariantMembers.HarpKey
  const lockHarpKey = () => {
    setLockedCovariant(CovariantMembers.HarpKey)
  }

  const { pozitionId } = activeHarpStrata
  const nudgeHarpStrataByPozition = useNudgeHarpStrataByPozition()
  const setHarpStrataByPozition = useSetHarpStrataByPozition()
  const pozitionOptionProps = {
    title: 'Position',
    activeOptionId: pozitionId,
    orderedOptionIds: orderedPozitionIds,
    nudgeFunction: nudgeHarpStrataByPozition,
    setFunction: setHarpStrataByPozition as (arg0: OptionIds) => void,
  }
  const pozitionIsLocked = lockedCovariant === CovariantMembers.Pozition
  const lockPozition = () => {
    setLockedCovariant(CovariantMembers.Pozition)
  }

  const { rootPitchId } = activeHarpStrata
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  const setHarpStrataByRootPitch = useSetHarpStrataByRootPitch()
  const rootPitchOptionProps = {
    title: 'Root Pitch',
    activeOptionId: rootPitchId,
    orderedOptionIds: orderedPitchIds,
    nudgeFunction: nudgeHarpStrataByRootPitch,
    setFunction: setHarpStrataByRootPitch as (arg0: OptionIds) => void,
  }
  const rootPitchIsLocked = lockedCovariant === CovariantMembers.RootPitch
  const lockRootPitch = () => {
    setLockedCovariant(CovariantMembers.RootPitch)
  }

  const sizes = useSizes()

  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <OptionLock locked={harpKeyIsLocked} handleTap={lockHarpKey}>
          <Option {...harpKeyOptionProps} />
        </OptionLock>
        <OptionLock locked={pozitionIsLocked} handleTap={lockPozition}>
          <Option {...pozitionOptionProps} />
        </OptionLock>
        <OptionLock locked={rootPitchIsLocked} handleTap={lockRootPitch}>
          <Option {...rootPitchOptionProps} />
        </OptionLock>
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <Feather
          name="sliders"
          size={sizes['7']}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
