import { View } from 'react-native'
import React from 'react'
import type { DegreeIds, PitchIds } from 'harpstrata'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples } from '../../utils'
import { DisplayModes } from '../../types'
import type { ExperienceModes } from '../../types'

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
  } = props

  const toneSource = getToneSource(degreeId, pitchId, displayMode)
  const toneTuples = getRenderableToneTuples(toneSource)
  const styles = getStyles(degreeId, isActive)

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

export const MemoHarpCellAccessible = React.memo(HarpCellAccessible)
