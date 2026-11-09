import { Dimensions, Platform } from 'react-native'

import { getWindowDimensions, setFrameDimensions } from './get-window-dimensions'

const { OS: originalOS } = Platform

afterEach(() => {
  Platform.OS = originalOS
  jest.restoreAllMocks()
})

const mockWindow = (width: number, height: number) =>
  jest
    .spyOn(Dimensions, 'get')
    .mockReturnValue({ width, height, scale: 1, fontScale: 1 })

test('On a device, the longer edge is the long edge whichever way it is held', () => {
  Platform.OS = 'ios'
  mockWindow(400, 800)

  expect(getWindowDimensions()).toStrictEqual({ longEdge: 800, shortEdge: 400 })
})

test('In a browser, the horizontal edge is the long edge even when it is shorter', () => {
  Platform.OS = 'web'
  mockWindow(320, 600)

  expect(getWindowDimensions()).toStrictEqual({ longEdge: 320, shortEdge: 600 })
})

test('A measured frame is used in place of the window, its width as the long edge', () => {
  Platform.OS = 'ios'
  mockWindow(1000, 500)
  setFrameDimensions({ width: 300, height: 600 })

  expect(getWindowDimensions()).toStrictEqual({ longEdge: 300, shortEdge: 600 })

  setFrameDimensions(undefined)
  expect(getWindowDimensions()).toStrictEqual({ longEdge: 1000, shortEdge: 500 })
})
