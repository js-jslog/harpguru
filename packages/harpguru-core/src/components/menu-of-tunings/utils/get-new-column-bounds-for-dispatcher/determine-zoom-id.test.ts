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
