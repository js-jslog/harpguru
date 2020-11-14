import Animated from 'react-native-reanimated'
import { View, ViewStyle } from 'react-native'
import React from 'react'
import type { DegreeIds, PitchIds } from 'harpstrata'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples } from '../../utils'
import { CellStates } from '../../types'
import type { DisplayModes, ExperienceModes } from '../../types'

import { getAccessibleStyles, getRenderableToneId } from './utils'
import { useTapAnimationValue } from './hooks'

type HarpCellAccessibleProps = {
  readonly degreeId: DegreeIds
  readonly pitchId: PitchIds
  readonly displayMode: DisplayModes
  readonly activeExperienceMode: ExperienceModes
  readonly cellState: CellStates
  readonly baseStyles: ViewStyle
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
    cellState === CellStates.On || cellState === CellStates.TappedOn
  const isTapped =
    cellState === CellStates.TappedOn || cellState === CellStates.TappedOff
  const renderableToneId = getRenderableToneId(degreeId, pitchId, displayMode)
  const renderableToneTuples = getRenderableToneTuples(renderableToneId)
  const accessibleStyles = getAccessibleStyles(degreeId, isActive)
  const tapAnimationValue = useTapAnimationValue(isTapped)

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: tapAnimationValue }],
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
