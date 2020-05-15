/**
 * @format
 */

import 'react-native'
import renderer from 'react-test-renderer'
import React from 'react'

import { exampleHarpFaceProps } from '../testResources'

import {HarpFace} from './index'

// Note: test renderer must be required after react-native.

test('A component is rendered', () => {
  renderer.create(<HarpFace {...exampleHarpFaceProps} />)
})
