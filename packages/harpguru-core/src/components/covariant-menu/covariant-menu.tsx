import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React from 'react'

import { OptionLock } from '../option-lock'
import { Option } from '../option'
import { getMenuStylesAndAnimationVals } from '../../utils'
import type { MenuProps } from '../../types'
import { CovariantMembers } from '../../packages/covariance-series'

import {
  useNudgeHarpStrataByHarpKey,
  useNudgeHarpStrataByPozition,
  useNudgeHarpStrataByRootPitch,
} from './hooks'

export const CovariantMenu = ({
  hideLabel,
  hideMenu,
  tapHandler,
}: MenuProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [lockedCovariant, setLockedCovariant] = useGlobal('lockedCovariant')

  const { harpKeyId } = activeHarpStrata
  const nudgeHarpStrataByHarpKey = useNudgeHarpStrataByHarpKey()
  const harpKeyOptionProps = {
    title: 'Harp Key',
    optionId: harpKeyId,
    nudgeFunction: nudgeHarpStrataByHarpKey,
  }
  const harpKeyIsLocked = lockedCovariant === CovariantMembers.HarpKey
  const lockHarpKey = () => {
    setLockedCovariant(CovariantMembers.HarpKey)
  }

  const { pozitionId } = activeHarpStrata
  const nudgeHarpStrataByPozition = useNudgeHarpStrataByPozition()
  const pozitionOptionProps = {
    title: 'Position',
    optionId: pozitionId,
    nudgeFunction: nudgeHarpStrataByPozition,
  }
  const pozitionIsLocked = lockedCovariant === CovariantMembers.Pozition
  const lockPozition = () => {
    setLockedCovariant(CovariantMembers.Pozition)
  }

  const { rootPitchId } = activeHarpStrata
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  const rootPitchOptionProps = {
    title: 'Root Pitch',
    optionId: rootPitchId,
    nudgeFunction: nudgeHarpStrataByRootPitch,
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
  } = getMenuStylesAndAnimationVals(hideMenu, hideLabel, 'TOP')

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
      <TapGestureHandler onHandlerStateChange={tapHandler}>
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
          </View>
          <View style={styles.rotatedLabel}>
            <Animated.View
              style={[
                {
                  transform: [{ scale: labelCounterScale }],
                },
              ]}
            >
              <View style={styles.labelAligner}>
                <Text style={styles.text}>Key / Position</Text>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  )
}
