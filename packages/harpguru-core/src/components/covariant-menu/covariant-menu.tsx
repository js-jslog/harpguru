import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { View } from 'react-native'
import React from 'react'
import { getPitchIds, getPozitionIds } from 'harpstrata'
import { Feather } from '@expo/vector-icons'

import { OptionLock } from '../option-lock'
import { Option } from '../option'
import { MenuOpenButton } from '../menu-open-button'
import { MenuCloseButton } from '../menu-close-button'
import { getMenuStylesAndAnimationVals } from '../../utils'
import type { MenuProps, OptionIds } from '../../types'
import { getSizes, colors } from '../../styles'
import { CovariantMembers } from '../../packages/covariance-series'

import {
  useNudgeHarpStrataByHarpKey,
  useNudgeHarpStrataByPozition,
  useNudgeHarpStrataByRootPitch,
  useSetHarpStrataByHarpKey,
  useSetHarpStrataByPozition,
  useSetHarpStrataByRootPitch,
} from './hooks'

export const CovariantMenu = ({
  hideLabel,
  hideMenu,
  openCloseTapHandler,
}: MenuProps): React.ReactElement => {
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

  const {
    styles,
    menuSlideXTranslation,
    menuSlideYTranslation,
    menuScale,
    menuBackgroundColor,
    menuOpacity,
    labelCounterScale,
    labelProtrusion,
  } = getMenuStylesAndAnimationVals(hideMenu, hideLabel, 'TOP')

  const sizes = getSizes()

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          transform: [
            { translateX: menuSlideXTranslation },
            { translateY: menuSlideYTranslation },
            { scale: menuScale },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: menuBackgroundColor,
            opacity: menuOpacity,
          },
        ]}
      >
        <View style={styles.mainContents}>
          <OptionLock locked={harpKeyIsLocked} handleTap={lockHarpKey}>
            <Option {...harpKeyOptionProps} />
          </OptionLock>
          <OptionLock locked={pozitionIsLocked} handleTap={lockPozition}>
            <Option {...pozitionOptionProps} />
          </OptionLock>
          <OptionLock locked={rootPitchIsLocked} handleTap={lockRootPitch}>
            <Option {...rootPitchOptionProps} />
          </OptionLock>
          <MenuCloseButton openCloseTapHandler={openCloseTapHandler} />
        </View>
        <MenuOpenButton
          counterScale={labelCounterScale}
          openCloseMenu={openCloseTapHandler}
          labelProtrusion={labelProtrusion}
        >
          <Feather
            name="sliders"
            size={sizes['7']}
            color={colors.inertOutline}
          />
        </MenuOpenButton>
      </Animated.View>
    </Animated.View>
  )
}
