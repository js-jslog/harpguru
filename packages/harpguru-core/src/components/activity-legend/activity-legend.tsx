import { useGlobal } from 'reactn'
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { getPitchIds, getDegreeIds } from 'harpstrata'

import { getSizes, colors } from '../../styles'

const { degreeColors, pageColor } = colors

export const ActivityLegend = (): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { rootPitchId, isActiveComplex: { activePitchIds } } = activeHarpStrata
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

  return (
    <View style={styles.block}>
      {activityCells}
    </View>
  )
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
  const { 7: pitchValueSize, 9: legendWidth, 3: inactiveProtrusion } = sizes
  const retraction = legendWidth - inactiveProtrusion

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
      color: isActive ? pageColor : degreeColor,
      fontSize: pitchValueSize,
    },
  })
  return (
    <>
      <View style={styles.cell}>
        <View
          style={[
            styles.cellColor,
            {
              transform: [{ translateX: isActive ? 0 : retraction * -1 }],
            },
          ]}
        />
        <View style={styles.pitchValuetWrapper}>
          <Text style={styles.pitchValue}>{pitchValue}</Text>
        </View>
      </View>
    </>
  )
}
