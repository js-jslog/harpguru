import 'react-native'
import React from 'react'
import { DegreeIds } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { exampleHarpFaceProps } from '../../HarpFace'

import {HarpRow} from './index'


test('A blow row from a major diatonic harmonica can be rendered', () => {
  const { getAllByText } = render(<HarpRow {...exampleHarpFaceProps} yCoord={2}/>)

  expect(getAllByText(DegreeIds.Root)[0]).toBeTruthy()
  expect(getAllByText(DegreeIds.Third)[0]).toBeTruthy()
  expect(getAllByText(DegreeIds.Fifth)[0]).toBeTruthy()
})
