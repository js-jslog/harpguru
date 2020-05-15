import 'react-native'
import React from 'react'
import {render} from '@testing-library/react-native'

import type {HarpCellProps} from './types'
import {HarpCell} from './index'

test('A component is rendered with an props value in its text view', () => {
  const harpCellProps: HarpCellProps = {content: 'A'}
  const {getByText} = render(<HarpCell {...harpCellProps} />)

  expect(getByText('A')).toBeTruthy()
})
