import 'react-native'
import React from 'react'
import { TuningIds, ValvingIds, PozitionIds, PitchIds } from 'harpparts'
import { render } from '@testing-library/react-native'

import { DisplayModes } from '../../types'

import { StandaloneHarpFace } from './standalone-harp-face'

const harpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

test('A harp face renders from the setup it is given, without the app around it', () => {
  const { getAllByText } = render(
    <StandaloneHarpFace
      harpStrataProps={harpStrataProps}
      displayMode={DisplayModes.Pitch}
      isInteractive={true}
    />
  )

  // Every hole number of a 10 hole harp is shown
  expect(getAllByText('10').length).toBeGreaterThan(0)
})

test('A new setup in the props reaches the harp face', () => {
  const { rerender, queryAllByText } = render(
    <StandaloneHarpFace
      harpStrataProps={harpStrataProps}
      displayMode={DisplayModes.Pitch}
      isInteractive={false}
    />
  )
  expect(queryAllByText('13')).toHaveLength(0)

  rerender(
    <StandaloneHarpFace
      harpStrataProps={{
        ...harpStrataProps,
        tuningId: TuningIds.Lucky13Richter,
      }}
      displayMode={DisplayModes.Pitch}
      isInteractive={false}
    />
  )

  expect(queryAllByText('13').length).toBeGreaterThan(0)
})
