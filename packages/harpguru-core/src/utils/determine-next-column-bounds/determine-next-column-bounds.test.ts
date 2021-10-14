import { ZoomIds } from '../../types'

import { determineNextColumnBounds } from './determine-next-column-bounds'

test('when the requested zoomId is Fit then the FIT columnBounds is always returned', () => {
  expect(determineNextColumnBounds(10, [0, 9], ZoomIds.Fit)).toStrictEqual(
    'FIT'
  )
  expect(determineNextColumnBounds(10, 'FIT', ZoomIds.Fit)).toStrictEqual('FIT')
  expect(determineNextColumnBounds(20, [100, 200], ZoomIds.Fit)).toStrictEqual(
    'FIT'
  )
  expect(determineNextColumnBounds(1, 'FIT', ZoomIds.Fit)).toStrictEqual('FIT')
})

test('a zero start columnBounds of the appropriate length is returned when the current columnBounds is FIT', () => {
  expect(determineNextColumnBounds(1, 'FIT', ZoomIds.Seven)).toStrictEqual([
    0,
    6,
  ])
  expect(determineNextColumnBounds(10, 'FIT', ZoomIds.Ten)).toStrictEqual([
    0,
    9,
  ])
  expect(determineNextColumnBounds(20, 'FIT', ZoomIds.Twelve)).toStrictEqual([
    0,
    11,
  ])
})

test('the start columnBound is preserved and the end chosen according to the zoom id is it still fits within the harp length', () => {
  expect(determineNextColumnBounds(100, [3, 80], ZoomIds.Seven)).toStrictEqual([
    3,
    9,
  ])
  expect(determineNextColumnBounds(100, [3, 80], ZoomIds.Ten)).toStrictEqual([
    3,
    12,
  ])
  expect(
    determineNextColumnBounds(100, [3, 80], ZoomIds.Twelve)
  ).toStrictEqual([3, 14])
})

test('the start columnBound is rolled back as necessary for the end column to be fit at the required implied zoom level', () => {
  expect(determineNextColumnBounds(10, [5, 9], ZoomIds.Seven)).toStrictEqual([
    3,
    9,
  ])
  expect(determineNextColumnBounds(15, [8, 14], ZoomIds.Ten)).toStrictEqual([
    5,
    14,
  ])
  expect(determineNextColumnBounds(15, [8, 14], ZoomIds.Twelve)).toStrictEqual([
    3,
    14,
  ])
})

test('the start columnBound is rolled back as far as possible down to 0, but no further and the zoom length is preserved with overspill', () => {
  expect(determineNextColumnBounds(7, [5, 9], ZoomIds.Seven)).toStrictEqual([
    0,
    6,
  ])
  expect(determineNextColumnBounds(10, [8, 14], ZoomIds.Ten)).toStrictEqual([
    0,
    9,
  ])
  expect(determineNextColumnBounds(12, [8, 14], ZoomIds.Twelve)).toStrictEqual([
    0,
    11,
  ])
  expect(determineNextColumnBounds(6, [5, 9], ZoomIds.Seven)).toStrictEqual([
    0,
    6,
  ])
  expect(determineNextColumnBounds(9, [8, 14], ZoomIds.Ten)).toStrictEqual([
    0,
    9,
  ])
  expect(determineNextColumnBounds(11, [8, 14], ZoomIds.Twelve)).toStrictEqual([
    0,
    11,
  ])
})
