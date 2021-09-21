import { determineBestBoundsForHarpLength } from './determine-best-bounds-for-harp-length'

test('best 7 holes are the same as input if end bound is less than or equal to harp length', () => {
  const harpLength = 10
  const inputColumnBoundsLessThan = [0, 6] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsLessThan)
  ).toBe(inputColumnBoundsLessThan)
  const inputColumnBoundsOnLimit = [3, 9] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsOnLimit)
  ).toBe(inputColumnBoundsOnLimit)
})

test('best 10 holes are the same as input if end bound is less than or equal to harp length', () => {
  const harpLength = 13
  const inputColumnBoundsLessThan = [0, 9] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsLessThan)
  ).toBe(inputColumnBoundsLessThan)
  const inputColumnBoundsOnLimit = [3, 12] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsOnLimit)
  ).toBe(inputColumnBoundsOnLimit)
})

test('best 12 holes are the same as input if end bound is less than or equal to harp length', () => {
  const harpLength = 15
  const inputColumnBoundsLessThan = [0, 11] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsLessThan)
  ).toBe(inputColumnBoundsLessThan)
  const inputColumnBoundsOnLimit = [3, 14] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsOnLimit)
  ).toBe(inputColumnBoundsOnLimit)
})

test('best 7 holes is shifted down when the end bound is past the harp length', () => {
  const harpLength = 10
  const expectedColumnBounds = [3, 9] as const

  const inputColumnBoundsByOne = [4, 10] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsByOne)
  ).toStrictEqual(expectedColumnBounds)
  const inputColumnBoundsByMany = [40, 46] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsByMany)
  ).toStrictEqual(expectedColumnBounds)
})

test('best 10 holes is shifted down when the end bound is past the harp length', () => {
  const harpLength = 13
  const expectedColumnBounds = [3, 12] as const

  const inputColumnBoundsByOne = [4, 13] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsByOne)
  ).toStrictEqual(expectedColumnBounds)
  const inputColumnBoundsByMany = [40, 49] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsByMany)
  ).toStrictEqual(expectedColumnBounds)
})

test('best 12 holes is shifted down when the end bound is past the harp length', () => {
  const harpLength = 15
  const expectedColumnBounds = [3, 14] as const

  const inputColumnBoundsByOne = [4, 15] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsByOne)
  ).toStrictEqual(expectedColumnBounds)
  const inputColumnBoundsByMany = [40, 51] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsByMany)
  ).toStrictEqual(expectedColumnBounds)
})

test('best 7 holes is started at 0 if the harp length is less than or equal to 7', () => {
  const harpLength = 7
  const expectedColumnBounds = [0, 6] as const

  const inputColumnBoundsExactly = [0, 6] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsExactly)
  ).toStrictEqual(expectedColumnBounds)
  const inputColumnBoundsOver = [40, 46] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsOver)
  ).toStrictEqual(expectedColumnBounds)

  const harpLengthLess = 5
  expect(
    determineBestBoundsForHarpLength(harpLengthLess, inputColumnBoundsExactly)
  ).toStrictEqual(expectedColumnBounds)
  expect(
    determineBestBoundsForHarpLength(harpLengthLess, inputColumnBoundsOver)
  ).toStrictEqual(expectedColumnBounds)
})

test('best 10 holes is started at 0 if the harp length is less than or equal to 10', () => {
  const harpLength = 10
  const expectedColumnBounds = [0, 9] as const

  const inputColumnBoundsExactly = [0, 9] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsExactly)
  ).toStrictEqual(expectedColumnBounds)
  const inputColumnBoundsOver = [40, 49] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsOver)
  ).toStrictEqual(expectedColumnBounds)

  const harpLengthLess = 5
  expect(
    determineBestBoundsForHarpLength(harpLengthLess, inputColumnBoundsExactly)
  ).toStrictEqual(expectedColumnBounds)
  expect(
    determineBestBoundsForHarpLength(harpLengthLess, inputColumnBoundsOver)
  ).toStrictEqual(expectedColumnBounds)
})

test('best 12 holes is started at 0 if the harp length is less than or equal to 12', () => {
  const harpLength = 12
  const expectedColumnBounds = [0, 11] as const

  const inputColumnBoundsExactly = [0, 11] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsExactly)
  ).toStrictEqual(expectedColumnBounds)
  const inputColumnBoundsOver = [40, 51] as const
  expect(
    determineBestBoundsForHarpLength(harpLength, inputColumnBoundsOver)
  ).toStrictEqual(expectedColumnBounds)

  const harpLengthLess = 5
  expect(
    determineBestBoundsForHarpLength(harpLengthLess, inputColumnBoundsExactly)
  ).toStrictEqual(expectedColumnBounds)
  expect(
    determineBestBoundsForHarpLength(harpLengthLess, inputColumnBoundsOver)
  ).toStrictEqual(expectedColumnBounds)
})
