import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { getSizes, colors } from '../../styles'

const { degreeColors, pageColor } = colors

export const ActivityLegend = (): React.ReactElement => {
  const sizes = getSizes()
  const { 9: legendWidth } = sizes

  const styles = StyleSheet.create({
    block: {
      ...StyleSheet.absoluteFillObject,
      width: legendWidth,
      flexDirection: 'column',
    },
  })

  return (
    <View style={styles.block}>
      <ActivityCell
        isActive={true}
        degreeColor={degreeColors['1']}
        pitchValue={'A'}
      />
      <ActivityCell
        isActive={false}
        degreeColor={degreeColors['2b']}
        pitchValue={'A#/Bb'}
      />
      <ActivityCell
        isActive={true}
        degreeColor={degreeColors['2']}
        pitchValue={'B'}
      />
      <ActivityCell
        isActive={false}
        degreeColor={degreeColors['3b']}
        pitchValue={'C'}
      />
      <ActivityCell
        isActive={true}
        degreeColor={degreeColors['3']}
        pitchValue={'C#/Db'}
      />
      <ActivityCell
        isActive={true}
        degreeColor={degreeColors['4']}
        pitchValue={'D'}
      />
      <ActivityCell
        isActive={false}
        degreeColor={degreeColors['5b']}
        pitchValue={'D#/Eb'}
      />
      <ActivityCell
        isActive={true}
        degreeColor={degreeColors['5']}
        pitchValue={'E'}
      />
      <ActivityCell
        isActive={false}
        degreeColor={degreeColors['6b']}
        pitchValue={'F'}
      />
      <ActivityCell
        isActive={true}
        degreeColor={degreeColors['6']}
        pitchValue={'F#/Gb'}
      />
      <ActivityCell
        isActive={false}
        degreeColor={degreeColors['7b']}
        pitchValue={'G'}
      />
      <ActivityCell
        isActive={true}
        degreeColor={degreeColors['7']}
        pitchValue={'G#/Ab'}
      />
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
