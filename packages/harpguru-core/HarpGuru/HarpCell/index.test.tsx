import 'react-native'
import React from 'react'
import { DegreeIds } from 'harpstrata'
import {render} from '@testing-library/react-native'

import { exampleHarpFaceProps } from '../HarpFace'

import {HarpCell} from './index'

test('A component is rendered with an props value in its text view', () => {
  const {getByText} = render(<HarpCell {...exampleHarpFaceProps} yxCoord={[3,0]} />)

  expect(getByText(DegreeIds.Second)).toBeTruthy()
})
