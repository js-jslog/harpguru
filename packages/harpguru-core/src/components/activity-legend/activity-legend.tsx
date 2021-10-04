import { useGlobal } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import Animated, {
  Easing,
  interpolate,
  multiply,
} from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { getDegreeIds, getPitchIds } from 'harpparts'
import type { DegreeIds, PitchIds } from 'harpparts'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples, getColors } from '../../utils'
import { DisplayModes } from '../../types'
import type { RenderableToneTuples } from '../../types'
import { useSizes } from '../../hooks'

const { degreeColors } = getColors()

const getToneSource = (
  degreeId: DegreeIds,
  pitchId: PitchIds,
  activeDisplayMode: DisplayModes
): DegreeIds | PitchIds => {
  if (activeDisplayMode === DisplayModes.Pitch) return degreeId
  return pitchId
}

export const ActivityLegend = (): React.ReactElement => {
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [rootPitchId] = useGlobal('rootPitchId')
  const [activePitchIds] = useGlobal('activePitchIds')
  const orderedPitchIds = getPitchIds(rootPitchId)
  const orderedDegreeIds = getDegreeIds()
  const { dynamicSizes } = useSizes()
  const { 9: legendWidth } = dynamicSizes

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
    legendWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: legendWidth,
      flexDirection: 'column',
    },
  })

  return <View style={styles.legendWrapper}>{activityCells}</View>
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
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const { dynamicSizes } = useSizes()
  const { 9: legendWidth } = dynamicSizes

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

  const activityCellTiming = useTimingTransition(isActive, {
    duration: 200,
    easing: Easing.inOut(Easing.circle),
  })
  const activityCellAnimation = interpolate(activityCellTiming, {
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
              transform: [{ translateX: activityCellAnimation }],
            },
          ]}
        />
        <RenderedTone
          toneTuples={toneTuples}
          isActive={isActive}
          isQuestion={false}
          splitType={'FLAT'}
          activeExperienceMode={activeExperienceMode}
        />
      </View>
    </>
  )
}
