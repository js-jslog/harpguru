import 'react-native'
import React from 'react'
import { DegreeIds } from 'harpstrata'
import {render} from '@testing-library/react-native'

import { exampleHarpFaceProps } from '../testResources'

import {HarpFace} from './index'

test('A component is rendered with all of the degrees of a major diatonic presented', () => {
  const { getAllByText } = render(<HarpFace {...exampleHarpFaceProps} />)

  const [ holeRoot ] = getAllByText(DegreeIds.Root)
  const [ holeFlat2 ] = getAllByText(DegreeIds.Flat2)
  const [ holeSecond ] = getAllByText(DegreeIds.Second)
  const [ holeFlat3 ] = getAllByText(DegreeIds.Flat3)
  const [ holeThird ] = getAllByText(DegreeIds.Third)
  const [ holeFourth ] = getAllByText(DegreeIds.Fourth)
  const [ holeFlat5 ] = getAllByText(DegreeIds.Flat5)
  const [ holeFifth ] = getAllByText(DegreeIds.Fifth)
  const [ holeFlat6 ] = getAllByText(DegreeIds.Flat6)
  const [ holeSixth ] = getAllByText(DegreeIds.Sixth)
  const [ holeFlat7 ] = getAllByText(DegreeIds.Flat7)
  const [ holeSeventh ] = getAllByText(DegreeIds.Seventh)
  
  expect(holeRoot).toBeTruthy()
})
