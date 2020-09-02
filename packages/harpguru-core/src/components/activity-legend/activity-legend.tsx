import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { getSizes, colors } from '../../styles'

const { degreeColors } = colors

export const ActivityLegend = (): React.ReactElement => {
  const sizes = getSizes()
  const { 9: legendWidth } = sizes

  const styles = StyleSheet.create({
    block: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'red',
      width: legendWidth,
      flexDirection: 'column',
    },
  })

  return (
    <View style={styles.block}>
      <ActivityCell degreeColor={degreeColors['1']} pitchValue={'A'} />
      <ActivityCell degreeColor={degreeColors['2b']} pitchValue={'A#/Bb'} />
      <ActivityCell degreeColor={degreeColors['2']} pitchValue={'B'} />
      <ActivityCell degreeColor={degreeColors['3b']} pitchValue={'C'} />
      <ActivityCell degreeColor={degreeColors['3']} pitchValue={'C#/Db'} />
      <ActivityCell degreeColor={degreeColors['4']} pitchValue={'D'} />
      <ActivityCell degreeColor={degreeColors['5b']} pitchValue={'D#/Eb'} />
      <ActivityCell degreeColor={degreeColors['5']} pitchValue={'E'} />
      <ActivityCell degreeColor={degreeColors['6b']} pitchValue={'F'} />
      <ActivityCell degreeColor={degreeColors['6']} pitchValue={'F#/Gb'} />
      <ActivityCell degreeColor={degreeColors['7b']} pitchValue={'G'} />
      <ActivityCell degreeColor={degreeColors['7']} pitchValue={'G#/Ab'} />
    </View>
  )
}

type ActivityCellProps = {
  readonly degreeColor: string
  readonly pitchValue: string
}

const ActivityCell = ({
  degreeColor,
  pitchValue,
}: ActivityCellProps): React.ReactElement => {
  const sizes = getSizes()
  const { 7: pitchValueSize } = sizes

  const styles = StyleSheet.create({
    cell: {
      flex: 1,
    },
    cellColorWrapper: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
    },
    cellColor: {
      backgroundColor: 'red',
    },
    pitchValuetWrapper: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pitchValue: {
      color: 'white',
      fontSize: pitchValueSize,
    },
  })
  return (
    <>
      <View style={styles.cell}>
        <View style={[styles.cell, { backgroundColor: degreeColor }]} />
        <View style={styles.pitchValuetWrapper}>
          <Text style={styles.pitchValue}>{pitchValue}</Text>
        </View>
      </View>
    </>
  )
}
