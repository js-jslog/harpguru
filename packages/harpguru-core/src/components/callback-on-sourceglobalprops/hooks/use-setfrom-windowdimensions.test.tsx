import { Dimensions, Platform } from 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import { StoreProvider, useHarpGuruStoreInstance } from '../../../store'
import type { HarpGuruStoreInstance } from '../../../store'

import { useSetFromWindowDimensions } from './use-setfrom-windowdimensions'

const { OS: originalOS } = Platform

afterEach(() => {
  Platform.OS = originalOS
  jest.restoreAllMocks()
})

const setWindow = (width: number, height: number) => {
  const size = { width, height, scale: 1, fontScale: 1 }
  jest.spyOn(Dimensions, 'get').mockReturnValue(size)
  // The module itself, not an `import * as` copy of it, or the hook never
  // sees the spy
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  jest.spyOn(require('react-native'), 'useWindowDimensions').mockReturnValue(size)
}

test('A resized browser window resizes the harp face', () => {
  Platform.OS = 'web'
  setWindow(1200, 600)
  let store: HarpGuruStoreInstance | undefined
  const Probe = () => {
    useSetFromWindowDimensions()
    store = useHarpGuruStoreInstance()
    return null
  }
  // A new element each time, or React skips the re-render
  const tree = () => (
    <StoreProvider pageNumber={1}>
      <Probe />
    </StoreProvider>
  )
  const { rerender } = render(tree())
  const wideColumnWidth = store?.getState().dynamicSizes.columnWidth ?? 0

  setWindow(320, 600)
  rerender(tree())
  const narrowColumnWidth = store?.getState().dynamicSizes.columnWidth ?? 0

  expect(narrowColumnWidth).toBeGreaterThan(0)
  expect(narrowColumnWidth).toBeLessThan(wideColumnWidth)
})
