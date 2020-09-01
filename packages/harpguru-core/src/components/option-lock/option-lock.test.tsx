import { View } from 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import { OptionLock } from './option-lock'

test('A locked label is added to  locked option', () => {
  const { getByText } = render(
    <OptionLock locked={true}>
      <View />
    </OptionLock>
  )
  expect(getByText('locked')).toBeTruthy()
})

test('A tap to lock label is added to an unlocked option', () => {
  const { getByText } = render(
    <OptionLock locked={false}>
      <View />
    </OptionLock>
  )
  expect(getByText('tap to lock')).toBeTruthy()
})
