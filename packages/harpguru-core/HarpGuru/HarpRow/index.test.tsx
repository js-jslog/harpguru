import 'react-native'
import renderer from 'react-test-renderer'
import React from 'react'

import { exampleHarpFaceProps } from '../HarpFace'

import {HarpRow} from './index'


test('A component is rendered', () => {
  renderer.create(<HarpRow {...exampleHarpFaceProps} />)
})
