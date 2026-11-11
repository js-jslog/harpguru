import 'react-native'
import React from 'react'
import type { Setup } from 'harpstrata'
import {
  TuningIds,
  ValvingIds,
  PozitionIds,
  PitchIds,
  DegreeIds,
} from 'harpparts'
import { fireEvent, render } from '@testing-library/react-native'
import type { RenderAPI } from '@testing-library/react-native'

import { StandaloneHarpFace } from './standalone-harp-face'

const setup: Setup = {
  harpStrataProps: {
    tuningId: TuningIds.MajorDiatonic,
    valvingId: ValvingIds.NotValved,
    pozitionId: PozitionIds.First,
    harpKeyId: PitchIds.C,
    activeIds: [DegreeIds.Root],
  },
  displayMode: 'pitch',
}

const layOut = ({ getByTestId }: RenderAPI, width = 800, height = 400) =>
  fireEvent(getByTestId('standalone-harp-face'), 'layout', {
    nativeEvent: { layout: { x: 0, y: 0, width, height } },
  })

const flatStyle = (style: unknown): Record<string, unknown> =>
  Object.assign({}, ...[style].flat(Infinity).filter(Boolean))

test('Nothing is drawn until the harp face knows its space, then it is drawn from the setup it is given', () => {
  const rendered = render(<StandaloneHarpFace setup={setup} isInteractive />)
  expect(rendered.queryAllByText('10')).toHaveLength(0)

  layOut(rendered)

  // The hole numbers of a 10 hole harp
  expect(rendered.getAllByText('10').length).toBeGreaterThan(0)
})

test('A new setup in the props reaches the harp face', () => {
  const rendered = render(
    <StandaloneHarpFace setup={setup} isInteractive={false} />
  )
  layOut(rendered)
  expect(rendered.queryAllByText('13')).toHaveLength(0)

  rendered.rerender(
    <StandaloneHarpFace
      setup={{
        ...setup,
        harpStrataProps: {
          ...setup.harpStrataProps,
          tuningId: TuningIds.Lucky13Richter,
        },
      }}
      isInteractive={false}
    />
  )

  expect(rendered.queryAllByText('13').length).toBeGreaterThan(0)
})

test('A new display mode in the props reaches the harp face', () => {
  const rendered = render(
    <StandaloneHarpFace setup={setup} isInteractive={false} />
  )
  layOut(rendered)
  const { length: pitchLabels } = rendered.queryAllByText('C')

  rendered.rerender(
    <StandaloneHarpFace
      setup={{ ...setup, displayMode: 'degree' }}
      isInteractive={false}
    />
  )

  expect(rendered.queryAllByText('C').length).toBeLessThan(pitchLabels)
})

test('Upright, the harp face is laid out in its box turned a quarter, and its labels turn back', () => {
  const rendered = render(
    <StandaloneHarpFace setup={setup} isInteractive={false} isUpright />
  )
  layOut(rendered, 400, 800)

  const turned = flatStyle(
    rendered.getByTestId('standalone-harp-face-turned').props.style
  )
  expect(turned).toMatchObject({
    width: 800,
    height: 400,
    transform: [{ rotate: '90deg' }],
  })
  const [holeNumber] = rendered.getAllByText('10')
  expect(flatStyle(holeNumber.props.style).transform).toEqual([
    { rotate: '-90deg' },
  ])
})

test('A change of orientation in the props reaches the harp face', () => {
  const rendered = render(
    <StandaloneHarpFace setup={setup} isInteractive={false} isUpright />
  )
  layOut(rendered, 400, 800)

  rendered.rerender(<StandaloneHarpFace setup={setup} isInteractive={false} />)

  expect(rendered.queryByTestId('standalone-harp-face-turned')).toBeNull()
  const [holeNumber] = rendered.getAllByText('10')
  expect(flatStyle(holeNumber.props.style).transform).toBeUndefined()
})
