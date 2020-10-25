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
  const equalDisplayMode = prevProps.displayMode === nextProps.displayMode
  const equalExperienceMode =
    prevProps.activeExperienceMode === nextProps.activeExperienceMode

  // Activity is unchanged if `isActive` is unchanged, but not if the `touchState` isn't UNDETERMINED
  // - this is because any of the other states which `touchState` is set to *mean* an interaction has taken place
  // Activity is unchanged if the `touchState` is unchanged, but not if it is `UNDETERMINED`
  // - this is because `touchState` is only set to `UNDETERMINED` at initial render and by a change in `isActive`
  // which itself obviously means that the state of the cell has to be rerendered. We just choose to drive that
  // rerender by the setting of the state to `UNDETERMINED` rather than by the `isActive` directly.
  const equalActivity =
    (prevProps.touchState === nextProps.touchState &&
      nextProps.touchState !== State.UNDETERMINED) ||
    (prevProps.isActive === nextProps.isActive &&
      nextProps.touchState === State.UNDETERMINED)

  const areEqual =
    equalStyle &&
    equalDegree &&
    equalPitch &&
    equalDisplayMode &&
    equalExperienceMode &&
    equalActivity

  return areEqual
}

export const MemoHarpCellAccessible = React.memo(HarpCellAccessible, areEqual)
