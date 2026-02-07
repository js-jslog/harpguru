import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { getDegreeIds, getPitchIds } from 'harpparts'
import type { DegreeIds, PitchIds } from 'harpparts'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples, getColors } from '../../utils'
import { DisplayModes } from '../../types'
import type { RenderableToneTuples } from '../../types'
import { useHarpGuruStore } from '../../store'

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
  const activeDisplayMode = useHarpGuruStore((state) => state.activeDisplayMode)
  const rootPitchId = useHarpGuruStore((state) => state.rootPitchId)
  const activePitchIds = useHarpGuruStore((state) => state.activePitchIds)
  const orderedPitchIds = getPitchIds(rootPitchId)
  const orderedDegreeIds = getDegreeIds()
  const { 9: legendWidth } = useHarpGuruStore((state) => state.dynamicSizes)

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
  const activeExperienceMode = useHarpGuruStore((state) => state.activeExperienceMode)
  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const { legendWidth } = dynamicSizes

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

  const derivedValue = useDerivedValue(() => {
    return withTiming(isActive ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.circle),
    })
  })

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      derivedValue.value,
      [0, 1],
      [legendWidth * -1, 0]
    )
    return { transform: [{ translateX }] }
  })

  return (
    <>
      <View style={styles.cell}>
        <Animated.View style={[styles.cellColor, animatedStyle]} />
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
