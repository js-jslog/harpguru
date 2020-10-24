import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
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
  readonly isTouched: boolean
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
    isTouched,
    baseStyles,
  } = props

  const renderableToneId = getRenderableToneId(degreeId, pitchId, displayMode)
  const renderableToneTuples = getRenderableToneTuples(renderableToneId)
  const accessibleStyles = getAccessibleStyles(degreeId, isActive)

  const optionUpdatedVal = useTimingTransition(isTouched, {
    duration: 200,
    easing: Easing.inOut(Easing.circle),
  })
  const optionUpdateTransition = interpolate(optionUpdatedVal, {
    inputRange: [0, 1],
    outputRange: isTouched ? [1.1, 1] : [1, 1],
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
          isActive={isActive}
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
  const equalActive = prevProps.isActive === nextProps.isActive
  const equalDisplayMode = prevProps.displayMode === nextProps.displayMode
  const equalExperienceMode =
    prevProps.activeExperienceMode === nextProps.activeExperienceMode
  const equalTouched = prevProps.isTouched === nextProps.isTouched

  return (
    equalStyle &&
    equalDegree &&
    equalPitch &&
    equalActive &&
    equalDisplayMode &&
    equalExperienceMode &&
    equalTouched
  )
}

export const MemoHarpCellAccessible = React.memo(HarpCellAccessible, areEqual)
