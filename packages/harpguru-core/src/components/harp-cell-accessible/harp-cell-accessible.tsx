import { View, ViewStyle } from 'react-native'
import React from 'react'
import type { DegreeIds, PitchIds } from 'harpstrata'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples } from '../../utils'
import { DisplayModes } from '../../types'
import type { ExperienceModes } from '../../types'

import { getAccessibleStyles } from './utils'

const getToneSource = (
  degreeId: DegreeIds | undefined,
  pitchId: PitchIds | undefined,
  activeDisplayMode: DisplayModes
): DegreeIds | PitchIds | undefined => {
  if (degreeId === undefined && pitchId === undefined) return undefined
  if (activeDisplayMode === DisplayModes.Degree) return degreeId
  return pitchId
}

type HarpCellAccessibleProps = {
  readonly degreeId: DegreeIds
  readonly pitchId: PitchIds
  readonly isActive: boolean
  readonly displayMode: DisplayModes
  readonly activeExperienceMode: ExperienceModes
  readonly baseStyle: ViewStyle
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
    baseStyle,
  } = props

  const toneSource = getToneSource(degreeId, pitchId, displayMode)
  const toneTuples = getRenderableToneTuples(toneSource)
  const accessibleStyles = getAccessibleStyles(degreeId, isActive)

  return (
    <View
      accessible={true}
      accessibilityRole="button"
      style={[baseStyle, accessibleStyles]}
    >
      <RenderedTone
        toneTuples={toneTuples}
        isActive={isActive}
        isQuestion={false}
        splitType={'SLANT'}
        activeExperienceMode={activeExperienceMode}
      />
    </View>
  )
}

const areEqual = (
  prevProps: HarpCellAccessibleProps,
  nextProps: HarpCellAccessibleProps
) => {
  // The baseStyle object is too deep to be successfully analysed by the memo comparison.
  // It's only the width and height which will vary in each render and they are
  // correlated so we only need to check one of them.
  const equalStyle = prevProps.baseStyle.width === nextProps.baseStyle.width
  const equalDegree = prevProps.degreeId === nextProps.degreeId
  const equalPitch = prevProps.pitchId === nextProps.pitchId
  const equalActive = prevProps.isActive === nextProps.isActive
  const equalDisplayMode = prevProps.displayMode === nextProps.displayMode
  const equalExperienceMode =
    prevProps.activeExperienceMode === nextProps.activeExperienceMode

  return (
    equalStyle &&
    equalDegree &&
    equalPitch &&
    equalActive &&
    equalDisplayMode &&
    equalExperienceMode
  )
}

export const MemoHarpCellAccessible = React.memo(HarpCellAccessible, areEqual)
