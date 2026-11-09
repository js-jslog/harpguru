import 'react-native'
import React from 'react'
import { TuningIds, ValvingIds, PozitionIds, PitchIds } from 'harpparts'
import { fireEvent, render } from '@testing-library/react-native'
import type { RenderAPI } from '@testing-library/react-native'

import { DisplayModes } from '../../types'
import { setFrameDimensions } from '../../packages/get-window-dimensions'

import { StandaloneHarpFace } from './standalone-harp-face'

const harpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

const layOut = ({ getByTestId }: RenderAPI) =>
  fireEvent(getByTestId('standalone-harp-face'), 'layout', {
    nativeEvent: { layout: { x: 0, y: 0, width: 800, height: 400 } },
  })

afterEach(() => setFrameDimensions(undefined))

test('Nothing is drawn until the harp face knows its space, then it is drawn from the setup it is given', () => {
  const rendered = render(
    <StandaloneHarpFace
      harpStrataProps={harpStrataProps}
      displayMode={DisplayModes.Pitch}
      isInteractive={true}
    />
  )
  expect(rendered.queryAllByText('10')).toHaveLength(0)

  layOut(rendered)

  // The hole numbers of a 10 hole harp
  expect(rendered.getAllByText('10').length).toBeGreaterThan(0)
})

test('A new setup in the props reaches the harp face', () => {
  const rendered = render(
    <StandaloneHarpFace
      harpStrataProps={harpStrataProps}
      displayMode={DisplayModes.Pitch}
      isInteractive={false}
    />
  )
  layOut(rendered)
  expect(rendered.queryAllByText('13')).toHaveLength(0)

  rendered.rerender(
    <StandaloneHarpFace
      harpStrataProps={{
        ...harpStrataProps,
        tuningId: TuningIds.Lucky13Richter,
      }}
      displayMode={DisplayModes.Pitch}
      isInteractive={false}
    />
  )

  expect(rendered.queryAllByText('13').length).toBeGreaterThan(0)
})
