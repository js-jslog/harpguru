import { getOctaveColumnGroups } from './index'

test('groups column indexes for a simple root columns mask', () => {
  const hasRootArray = [true, false, false, true, false, false]
  const expectedRangeIndexes = [
    [0, 1, 2],
    [3, 4, 5],
  ]

  const actualRangeIndexes = getOctaveColumnGroups(hasRootArray)

  expect(actualRangeIndexes).toStrictEqual(expectedRangeIndexes)
})

test('groups column indexes for a simple HasRootArray which doesnt start with a root column', () => {
  const hasRootArray = [false, true, false, true, false, false]
  const expectedRangeIndexes = [[0], [1, 2], [3, 4, 5]]

  const actualRangeIndexes = getOctaveColumnGroups(hasRootArray)

  expect(actualRangeIndexes).toStrictEqual(expectedRangeIndexes)
})

test('groups column indexes for a simple HasRootArray with consecutive root columns', () => {
  const hasRootArray = [false, true, true, false, true, false, false]
  const expectedRangeIndexes = [[0], [1, 2, 3], [4, 5, 6]]

  const actualRangeIndexes = getOctaveColumnGroups(hasRootArray)

  expect(actualRangeIndexes).toStrictEqual(expectedRangeIndexes)
})

test('groups column successfully when its on its own at the end', () => {
  const hasRootArray = [true, false, true]
  const expectedRangeIndexes = [[0, 1], [2]]

  const actualRangeIndexes = getOctaveColumnGroups(hasRootArray)

  expect(actualRangeIndexes).toStrictEqual(expectedRangeIndexes)
})

test('groups column indexes for an artifically complex root columns mask', () => {
  const hasRootArray = [
    false,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
  ]
  const expectedRangeIndexes = [[0, 1], [2, 3, 4, 5], [6, 7, 8], [9, 10], [11]]

  const actualRangeIndexes = getOctaveColumnGroups(hasRootArray)

  expect(actualRangeIndexes).toStrictEqual(expectedRangeIndexes)
})
