import { reduceSourceColumnBoundsToColumnBounds } from './reduce-sourcecolumnbounds-to-columnbounds'

const columnBounds1 = 'FIT'
const columnBounds2 = [0, 1] as const
const columnBounds3 = [10, 100] as const
const sourceColumnBounds1 = 'FIT'
const sourceColumnBounds2 = [0, 1] as const
const sourceColumnBounds3 = [10, 100] as const

test('the previous columnBounds object matches the sourceColumnBounds then the previous columnBounds is returned', () => {
  expect(
    reduceSourceColumnBoundsToColumnBounds(columnBounds1, sourceColumnBounds1)
  ).toBe(columnBounds1)
  expect(
    reduceSourceColumnBoundsToColumnBounds(columnBounds2, sourceColumnBounds2)
  ).toBe(columnBounds2)
  expect(
    reduceSourceColumnBoundsToColumnBounds(columnBounds3, sourceColumnBounds3)
  ).toBe(columnBounds3)
})

test('the sourceColumnBounds is returned if it doesnt match the previous columnBounds', () => {
  expect(
    reduceSourceColumnBoundsToColumnBounds(columnBounds2, sourceColumnBounds1)
  ).toStrictEqual(columnBounds1)
  expect(
    reduceSourceColumnBoundsToColumnBounds(columnBounds3, sourceColumnBounds1)
  ).toStrictEqual(columnBounds1)
  expect(
    reduceSourceColumnBoundsToColumnBounds(columnBounds1, sourceColumnBounds2)
  ).toStrictEqual(columnBounds2)
  expect(
    reduceSourceColumnBoundsToColumnBounds(columnBounds3, sourceColumnBounds2)
  ).toStrictEqual(columnBounds2)
  expect(
    reduceSourceColumnBoundsToColumnBounds(columnBounds1, sourceColumnBounds3)
  ).toStrictEqual(columnBounds3)
  expect(
    reduceSourceColumnBoundsToColumnBounds(columnBounds2, sourceColumnBounds3)
  ).toStrictEqual(columnBounds3)
})
