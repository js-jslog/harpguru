import { useGlobal } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import Animated, {
  Easing,
  interpolate,
  multiply,
} from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { getPitchIds, getDegreeIds } from 'harpstrata'

import { RenderedTone } from '../rendered-tone'
import type { RenderableToneTuples } from '../rendered-tone'
import { getDisplayValueTuple } from '../../utils'
import { DisplayModes } from '../../types'
import { getSizes, colors } from '../../styles'

const { degreeColors, pageColor, inertOutline } = colors

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
    const legendDisplayMode =
      activeDisplayMode === DisplayModes.Pitch
        ? DisplayModes.Degree
        : DisplayModes.Pitch
    const toneTuples = getDisplayValueTuple(
      degreeId,
      pitchId,
      legendDisplayMode
    ) as RenderableToneTuples
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
  const { 7: pitchValueSize, 9: legendWidth } = sizes

  const styles = StyleSheet.create({
    cell: {
      flex: 1,
    },
    cellColor: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: degreeColor,
    },
    pitchValuetWrapper: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pitchValue: {
      color: isActive ? pageColor : inertOutline,
      fontSize: pitchValueSize,
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
        <View style={styles.pitchValuetWrapper}>
          <RenderedTone
            toneTuples={toneTuples}
            isActive={isActive}
            splitType={'FLAT'}
          />
        </View>
      </View>
    </>
  )
}
