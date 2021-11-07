import { useGlobal } from 'reactn'
import React from 'react'
import { render } from '@testing-library/react-native'

import {
  inactiveCellsHarpStrata,
  buildMockUseGlobalImplementation,
} from '../../test-resources'

import { ZoomSlideVerticalNew } from './zoom-slide-vertical-new'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('A slider is not rendered when the whole harp is visible', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      sourceColumnBounds: 'FIT',
    })
  )

  const { toJSON: toJSONAtFIT } = render(<ZoomSlideVerticalNew />)
  expect(toJSONAtFIT()).toMatchSnapshot()

  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      sourceColumnBounds: [0, 100],
    })
  )

  const { toJSON: toJSONAtColumnBounds } = render(<ZoomSlideVerticalNew />)
  expect(toJSONAtColumnBounds()).toMatchSnapshot()
})

// I would like to add some tests for the content and position of the
// slider being accurate on each render, but I've been unable to get
// the `useEffect` to even fire, let alone try and produce some gestures
// and have the animation tested.
//
// https://github.com/threepointone/react-act-examples/blob/master/sync.md
//
// The above link might be useful, but I've tried it and still had no luck
