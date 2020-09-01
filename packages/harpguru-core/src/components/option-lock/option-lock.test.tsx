import { View } from 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import { OptionLock } from './option-lock'

test('A locked label is added to  locked option', () => {
  const handleTap = jest.fn()
  const { getByText } = render(
    <OptionLock locked={true} handleTap={handleTap}>
      <View />
    </OptionLock>
  )
  expect(getByText('locked')).toBeTruthy()
})

test('A tap to lock label is added to an unlocked option', () => {
  const handleTap = jest.fn()
  const { getByText } = render(
    <OptionLock locked={false} handleTap={handleTap}>
      <View />
    </OptionLock>
  )
  expect(getByText('tap to lock')).toBeTruthy()
})

test.skip('Tapping the component calls its parameterised tap handler', () => {
  const handleTap = jest.fn()
  const { getByText } = render(
    <OptionLock locked={false} handleTap={handleTap}>
      <View />
    </OptionLock>
  )
  fireEvent.press(getByText('tap to lock'))
  expect(handleTap.mock.calls.length).toBe(1)
})
