import { View } from 'react-native'
import React from 'react'
import type { DegreeIds, PitchIds } from 'harpstrata'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples } from '../../utils'
import { DisplayModes } from '../../types'
import type { ExperienceModes } from '../../types'
import type { SizeScheme } from '../../styles'

import { getStyles } from './utils'

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
  readonly sizes: SizeScheme
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
    sizes,
  } = props

  const toneSource = getToneSource(degreeId, pitchId, displayMode)
  const toneTuples = getRenderableToneTuples(toneSource)
  const styles = getStyles(degreeId, isActive, sizes)

  return (
    <View accessible={true} accessibilityRole="button" style={styles.cell}>
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
  // The sizes object is too deep to be successfully analysed by the memo comparison.
  // All the values in the object are related so we only need to check one of the values.
  const equalSizes = prevProps.sizes['1'] === nextProps.sizes['1']
  const equalDegree = prevProps.degreeId === nextProps.degreeId
  const equalPitch = prevProps.pitchId === nextProps.pitchId
  const equalActive = prevProps.isActive === nextProps.isActive
  const equalDisplayMode = prevProps.displayMode === nextProps.displayMode
  const equalExperienceMode =
    prevProps.activeExperienceMode === nextProps.activeExperienceMode

  return (
    equalDegree &&
    equalPitch &&
    equalActive &&
    equalDisplayMode &&
    equalExperienceMode &&
    equalSizes
  )
}

export const MemoHarpCellAccessible = React.memo(HarpCellAccessible, areEqual)
