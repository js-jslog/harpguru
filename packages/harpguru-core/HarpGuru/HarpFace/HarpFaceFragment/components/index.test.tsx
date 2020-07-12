import 'react-native'
import React from 'react'
import { DegreeIds } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { harpFaceProps } from '../../testResources'

import { HarpFaceFragment } from './index'

test('A component is rendered with all of the degrees of a major diatonic presented', () => {
  const { getAllByText } = render(
    <HarpFaceFragment
      {...harpFaceProps}
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    />
  )

  const [holeRoot] = getAllByText(DegreeIds.Root)
  const [holeFlat2] = getAllByText(DegreeIds.Flat2)
  const [holeSecond] = getAllByText(DegreeIds.Second)
  const [holeFlat3] = getAllByText(DegreeIds.Flat3)
  const [holeThird] = getAllByText(DegreeIds.Third)
  const [holeFourth] = getAllByText(DegreeIds.Fourth)
  const [holeFlat5] = getAllByText(DegreeIds.Flat5)
  const [holeFifth] = getAllByText(DegreeIds.Fifth)
  const [holeFlat6] = getAllByText(DegreeIds.Flat6)
  const [holeSixth] = getAllByText(DegreeIds.Sixth)
  const [holeFlat7] = getAllByText(DegreeIds.Flat7)
  const [holeSeventh] = getAllByText(DegreeIds.Seventh)

  expect(holeRoot).toBeTruthy()
  expect(holeFlat2).toBeTruthy()
  expect(holeSecond).toBeTruthy()
  expect(holeFlat3).toBeTruthy()
  expect(holeThird).toBeTruthy()
  expect(holeFourth).toBeTruthy()
  expect(holeFlat5).toBeTruthy()
  expect(holeFifth).toBeTruthy()
  expect(holeFlat6).toBeTruthy()
  expect(holeSixth).toBeTruthy()
  expect(holeFlat7).toBeTruthy()
  expect(holeSeventh).toBeTruthy()
})

test('A snapshot of a HarpFaceFragment', () => {
  const { container } = render(
    <HarpFaceFragment
      {...harpFaceProps}
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    />
  )

  expect(container).toMatchSnapshot()
})
