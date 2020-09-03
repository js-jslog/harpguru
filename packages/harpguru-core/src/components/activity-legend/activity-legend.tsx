import { useGlobal } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import Animated, {
  Easing,
  interpolate,
  multiply,
} from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { getDegreeIds, getPitchIds } from 'harpstrata'
import type { DegreeIds, PitchIds } from 'harpstrata'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples } from '../../utils'
import { DisplayModes } from '../../types'
import type { RenderableToneTuples } from '../../types'
import { getSizes, colors } from '../../styles'

const { degreeColors, pageColor, inertOutline } = colors

const getToneSource = (
  degreeId: DegreeIds,
  pitchId: PitchIds,
  activeDisplayMode: DisplayModes
): DegreeIds | PitchIds => {
  if (activeDisplayMode === DisplayModes.Pitch) return degreeId
  return pitchId
}

export const ActivityLegend = (): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const {
    rootPitchId,
    isActiveComplex: { activePitchIds },
  } = activeHarpStrata
  const orderedPitchIds = getPitchIds(rootPitchId)
  const orderedDegreeIds = getDegreeIds()
  const sizes = getSizes()
  const { 9: legendWidth } = sizes

  const activityCells = orderedPitchIds.map((pitchId, index) => {
    const isActive = activePitchIds.indexOf(pitchId) > -1
    const { [index]: degreeId } = orderedDegreeIds
    const { [degreeId]: degreeColor } = degreeColors
    const toneSource = getToneSource(degreeId, pitchId, activeDisplayMode)
    const toneTuples = getRenderableToneTuples(toneSource)
    return (
      <ActivityCell
        key={index}
        isActive={isActive}
        degreeColor={degreeColor}
        toneTuples={toneTuples}
      />
    )
  })

  const styles = StyleSheet.create({
    block: {
      ...StyleSheet.absoluteFillObject,
      width: legendWidth,
      flexDirection: 'column',
    },
  })

  return <View style={styles.block}>{activityCells}</View>
}

type ActivityCellProps = {
  readonly degreeColor: string
  readonly toneTuples: RenderableToneTuples
  readonly isActive: boolean
}

const ActivityCell = ({
  degreeColor,
  toneTuples,
  isActive,
}: ActivityCellProps): React.ReactElement => {
  const sizes = getSizes()
  const { 9: legendWidth } = sizes

  const styles = StyleSheet.create({
    cell: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cellColor: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: degreeColor,
    },
  })

  const hideActivityCellVal = useTimingTransition(isActive, {
    duration: 200,
    easing: Easing.inOut(Easing.circle),
  })
  const hideActivityCellTranslation = interpolate(hideActivityCellVal, {
    inputRange: [0, 1],
    outputRange: [multiply(legendWidth, -1), 0],
  })

  return (
    <>
      <View style={styles.cell}>
        <Animated.View
          style={[
            styles.cellColor,
            {
              transform: [{ translateX: hideActivityCellTranslation }],
            },
          ]}
        />
        <RenderedTone
          toneTuples={toneTuples}
          isActive={isActive}
          splitType={'FLAT'}
        />
      </View>
    </>
  )
}
