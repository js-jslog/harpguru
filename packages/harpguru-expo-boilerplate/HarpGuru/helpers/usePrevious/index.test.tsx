import React from 'react'
import {render} from '@testing-library/react-native'

import { TestingComponent } from './TestingComponent'

test('Use of same hook from different components results in totally isolated ref values', () => {
  const {getByText: getByText_1, rerender: rerender_1} = render(<TestingComponent value={'value for #1'} initial={'initial for #1'} />)
  const {getByText: getByText_2, rerender: rerender_2} = render(<TestingComponent value={'value for #2'} initial={'initial for #2'} />)
  const {getByText: getByText_3} = render(<TestingComponent value={1} initial={0} />)

  expect(getByText_1('Current: value for #1')).toBeTruthy()
  expect(getByText_1('Previous: initial for #1')).toBeTruthy()

  expect(getByText_2('Current: value for #2')).toBeTruthy()
  expect(getByText_2('Previous: initial for #2')).toBeTruthy()

  expect(getByText_3('Current: 1')).toBeTruthy()
  expect(getByText_3('Previous: 0')).toBeTruthy()

  rerender_1(<TestingComponent value={'a new value for #1'} initial={'it doesnt matter what this is after hook initialisation'}/>)

  expect(getByText_1('Current: a new value for #1')).toBeTruthy()
  expect(getByText_1('Previous: value for #1')).toBeTruthy()

  expect(getByText_2('Current: value for #2')).toBeTruthy()
  expect(getByText_2('Previous: initial for #2')).toBeTruthy()

  expect(getByText_3('Current: 1')).toBeTruthy()
  expect(getByText_3('Previous: 0')).toBeTruthy()

  rerender_2(<TestingComponent value={'a new value for #2'} initial={'it doesnt matter what this is after hook initialisation'}/>)

  expect(getByText_1('Current: a new value for #1')).toBeTruthy()
  expect(getByText_1('Previous: value for #1')).toBeTruthy()

  expect(getByText_2('Current: a new value for #2')).toBeTruthy()
  expect(getByText_2('Previous: value for #2')).toBeTruthy()

  expect(getByText_3('Current: 1')).toBeTruthy()
  expect(getByText_3('Previous: 0')).toBeTruthy()
})
