import { Text } from 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import { AnimatedMenuContainer } from './index'

test('AnimatedMenuContainer renders a component with children', () => {
  const testText = 'Test text'
  const { getByText } = render(
    <AnimatedMenuContainer onScreen={true}>
      <Text>{testText}</Text>
    </AnimatedMenuContainer>
  )
  expect(getByText(testText)).toBeTruthy()
})
