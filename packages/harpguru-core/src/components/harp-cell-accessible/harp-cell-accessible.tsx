import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler'
import { View, ViewStyle } from 'react-native'
import React from 'react'
import type { DegreeIds, PitchIds } from 'harpstrata'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples } from '../../utils'
import type { DisplayModes, ExperienceModes } from '../../types'

import { getAccessibleStyles, getRenderableToneId } from './utils'

type HarpCellAccessibleProps = {
  readonly degreeId: DegreeIds
  readonly pitchId: PitchIds
  readonly isActive: boolean
  readonly displayMode: DisplayModes
  readonly activeExperienceMode: ExperienceModes
  readonly baseStyles: ViewStyle
  readonly touchState: State
}

export const HarpCellAccessible = (
  props: HarpCellAccessibleProps
): React.ReactElement => {
  const {
    degreeId,
    pitchId,
    isActive,
    displayMode,
    activeExperienceMode,
    touchState,
    baseStyles,
  } = props

  const isPreToggled = [State.BEGAN, State.END].includes(touchState)
  const isReallyActive =
    (isActive && !isPreToggled) || (!isActive && isPreToggled)

  const renderableToneId = getRenderableToneId(degreeId, pitchId, displayMode)
  const renderableToneTuples = getRenderableToneTuples(renderableToneId)
  const accessibleStyles = getAccessibleStyles(degreeId, isReallyActive)

  const optionUpdatedVal = useTimingTransition(touchState === State.BEGAN, {
    duration: 100,
    easing: Easing.inOut(Easing.circle),
  })
  const optionUpdateTransition = interpolate(optionUpdatedVal, {
    inputRange: [0, 1],
    outputRange: touchState === State.BEGAN ? [0.5, 1] : [1, 1],
  })

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: optionUpdateTransition }],
        },
      ]}
    >
      <View
        accessible={true}
        accessibilityRole="button"
        style={[baseStyles, accessibleStyles]}
      >
        <RenderedTone
          toneTuples={renderableToneTuples}
          isActive={isReallyActive}
          isQuestion={false}
          splitType={'SLANT'}
          activeExperienceMode={activeExperienceMode}
        />
      </View>
    </Animated.View>
  )
}

const areEqual = (
  prevProps: HarpCellAccessibleProps,
  nextProps: HarpCellAccessibleProps
) => {
  // The baseStyle object is too deep to be successfully analysed by the memo comparison.
  // It's only the width and height which will vary in each render and they are
  // correlated so we only need to check one of them.
  const equalStyle = prevProps.baseStyles.width === nextProps.baseStyles.width
  const equalDegree = prevProps.degreeId === nextProps.degreeId
  const equalPitch = prevProps.pitchId === nextProps.pitchId
  const equalActive =
    nextProps.touchState !== State.UNDETERMINED ||
    prevProps.isActive === nextProps.isActive
  const equalDisplayMode = prevProps.displayMode === nextProps.displayMode
  const equalExperienceMode =
    prevProps.activeExperienceMode === nextProps.activeExperienceMode
  const equalTouched = prevProps.touchState === nextProps.touchState

  const areEqual =
    equalStyle &&
    equalDegree &&
    equalPitch &&
    equalActive &&
    equalDisplayMode &&
    equalExperienceMode &&
    equalTouched
  return areEqual
}

export const MemoHarpCellAccessible = React.memo(HarpCellAccessible, areEqual)
