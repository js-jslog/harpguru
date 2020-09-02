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

import { NoteDisplayFragment } from '../note-display-fragment'
import { getSizes, colors } from '../../styles'

const { degreeColors, pageColor, inertOutline } = colors

export const ActivityLegend = (): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
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
    return (
      <ActivityCell
        key={index}
        isActive={isActive}
        degreeColor={degreeColor}
        pitchValue={pitchId}
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
  readonly pitchValue: string
  readonly isActive: boolean
}

const ActivityCell = ({
  degreeColor,
  pitchValue,
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

  const displayTuple =
    pitchValue.split('').length === 1
      ? [[pitchValue, undefined]]
      : [[pitchValue.split('')[0], pitchValue.split('')[1]]]

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
          <NoteDisplayFragment
            isActive={isActive}
            displayValue={displayTuple}
          />
        </View>
      </View>
    </>
  )
}
