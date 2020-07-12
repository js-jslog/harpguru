import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import { harpFaceProps } from '../../testResources'

import { HarpFaceFragment } from './index'

test('A snapshot of a HarpFaceFragment', () => {
  const { container } = render(
    <HarpFaceFragment
      {...harpFaceProps}
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    />
  )

  expect(container).toMatchSnapshot()
})
