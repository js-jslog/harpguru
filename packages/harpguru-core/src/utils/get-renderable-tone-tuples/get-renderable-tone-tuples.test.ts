import { DegreeIds, PitchIds } from 'harpstrata'

import { getRenderableToneTuples } from './get-renderable-tone-tuples'

test('returns an undefined tone tuple with an undefined input', () => {
  const expected = [[undefined, undefined]]
  const actual = getRenderableToneTuples(undefined)

  expect(actual).toStrictEqual(expected)
})

test('returns a natural degree tone tuple', () => {
  const expected = [['2', '']]
  const actual = getRenderableToneTuples(DegreeIds.Second)

  expect(actual).toStrictEqual(expected)
})

test('returns a flat degree tone tuple', () => {
  const expected = [['2', 'b']]
  const actual = getRenderableToneTuples(DegreeIds.Flat2)

  expect(actual).toStrictEqual(expected)
})

test('returns a natural pitch tone tuple', () => {
  const expected = [['A', '']]
  const actual = getRenderableToneTuples(PitchIds.A)

  expect(actual).toStrictEqual(expected)
})

test('returns a flat pitch tone tuple', () => {
  const expected = [
    ['A', '#'],
    ['B', 'b'],
  ]
  const actual = getRenderableToneTuples(PitchIds.Bb)

  expect(actual).toStrictEqual(expected)
})
