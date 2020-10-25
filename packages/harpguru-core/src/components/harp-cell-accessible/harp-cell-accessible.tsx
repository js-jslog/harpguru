import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { View, ViewStyle } from 'react-native'
import React from 'react'
import type { DegreeIds, PitchIds } from 'harpstrata'

import { RenderedTone } from '../rendered-tone'
import { CellState } from '../harp-cell/hooks/use-tap-rerender-logic/use-tap-rerender-logic'
import { getRenderableToneTuples } from '../../utils'
import type { DisplayModes, ExperienceModes } from '../../types'

import { getAccessibleStyles, getRenderableToneId } from './utils'

type HarpCellAccessibleProps = {
  readonly degreeId: DegreeIds
  readonly pitchId: PitchIds
  readonly displayMode: DisplayModes
  readonly activeExperienceMode: ExperienceModes
  readonly baseStyles: ViewStyle
  readonly cellState: CellState
}

export const HarpCellAccessible = (
  props: HarpCellAccessibleProps
): React.ReactElement => {
  const {
    degreeId,
    pitchId,
    displayMode,
    activeExperienceMode,
    cellState,
    baseStyles,
  } = props

  const isActive =
    cellState === CellState.ON || cellState === CellState.TAPPED_ON
  const isTapped =
    cellState === CellState.TAPPED_ON || cellState === CellState.TAPPED_OFF
  const renderableToneId = getRenderableToneId(degreeId, pitchId, displayMode)
  const renderableToneTuples = getRenderableToneTuples(renderableToneId)
  const accessibleStyles = getAccessibleStyles(degreeId, isActive)

  const optionUpdatedVal = useTimingTransition(isTapped, {
    duration: 100,
    easing: Easing.inOut(Easing.circle),
  })
  const optionUpdateTransition = interpolate(optionUpdatedVal, {
    inputRange: [0, 1],
    outputRange: isTapped ? [0.5, 1] : [1, 1],
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
  const equalDisplayMode = prevProps.displayMode === nextProps.displayMode
  const equalExperienceMode =
    prevProps.activeExperienceMode === nextProps.activeExperienceMode
  const equalCellState = prevProps.cellState === nextProps.cellState

  const areEqual =
    equalStyle &&
    equalDegree &&
    equalPitch &&
    equalDisplayMode &&
    equalExperienceMode &&
    equalCellState

  return areEqual
}

export const MemoHarpCellAccessible = React.memo(HarpCellAccessible, areEqual)
