import { Dimensions, Platform } from 'react-native'

import { getLinkDialogScale } from './link-dialog'

const { OS: originalOS } = Platform

const mockWindow = (width: number, height: number) =>
  jest
    .spyOn(Dimensions, 'get')
    .mockReturnValue({ width, height, scale: 1, fontScale: 1 })

beforeEach(() => {
  Platform.OS = 'ios'
})

afterEach(() => {
  Platform.OS = originalOS
  jest.restoreAllMocks()
})

test('The phone the dialogs are drawn for gets them as drawn', () => {
  mockWindow(844, 390)
  expect(getLinkDialogScale()).toBe(1)
})

test('A narrower phone shrinks them to its width, so they still fit', () => {
  // An iPhone SE held sideways: tall enough, but narrow
  mockWindow(667, 375)
  expect(getLinkDialogScale()).toBeCloseTo(667 / 844)
})

test('A tablet grows them, but only so far', () => {
  mockWindow(1366, 1024)
  expect(getLinkDialogScale()).toBe(1.5)
})

test('A very small window never shrinks them below three quarters', () => {
  mockWindow(400, 200)
  expect(getLinkDialogScale()).toBe(0.75)
})
