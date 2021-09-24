import { ZoomIds } from '../../types'

import { determineZoomId } from './determine-zoom-id'

test('a FIT columnBounds is associated with a Fit ZoomId', () => {
  const columnBounds = 'FIT'
  expect(determineZoomId(columnBounds)).toBe(ZoomIds.Fit)
})

test('a 7 hole columnBounds is associated with a Seven ZoomId', () => {
  const columnBounds1 = [0, 6] as const
  const columnBounds2 = [1, 7] as const
  const columnBounds3 = [10, 16] as const
  const columnBounds4 = [19, 25] as const
  expect(determineZoomId(columnBounds1)).toBe(ZoomIds.Seven)
  expect(determineZoomId(columnBounds2)).toBe(ZoomIds.Seven)
  expect(determineZoomId(columnBounds3)).toBe(ZoomIds.Seven)
  expect(determineZoomId(columnBounds4)).toBe(ZoomIds.Seven)
})

test('a 10 hole columnBounds is associated with a Ten ZoomId', () => {
  const columnBounds1 = [0, 9] as const
  const columnBounds2 = [1, 10] as const
  const columnBounds3 = [10, 19] as const
  const columnBounds4 = [19, 28] as const
  expect(determineZoomId(columnBounds1)).toBe(ZoomIds.Ten)
  expect(determineZoomId(columnBounds2)).toBe(ZoomIds.Ten)
  expect(determineZoomId(columnBounds3)).toBe(ZoomIds.Ten)
  expect(determineZoomId(columnBounds4)).toBe(ZoomIds.Ten)
})

test('a 12 hole columnBounds is associated with a Twelve ZoomId', () => {
  const columnBounds1 = [0, 11] as const
  const columnBounds2 = [1, 12] as const
  const columnBounds3 = [10, 21] as const
  const columnBounds4 = [19, 30] as const
  expect(determineZoomId(columnBounds1)).toBe(ZoomIds.Twelve)
  expect(determineZoomId(columnBounds2)).toBe(ZoomIds.Twelve)
  expect(determineZoomId(columnBounds3)).toBe(ZoomIds.Twelve)
  expect(determineZoomId(columnBounds4)).toBe(ZoomIds.Twelve)
})
