import { DegreeIds } from 'harpparts'

import { reduceToEmptyBufferedActivityToggles } from './reduce-to-empty-bufferedactivitytoggles'

test('the previous toggle buffer object is returned if it is already empty', () => {
  const prevBufferedActivityToggles = [] as ReadonlyArray<DegreeIds>
  const nextBufferedActivityToggles = reduceToEmptyBufferedActivityToggles(
    prevBufferedActivityToggles
  )
  expect(nextBufferedActivityToggles).toBe(prevBufferedActivityToggles)
})

test('a new empty buffer object is returned the previous one is not empty', () => {
  const prevBufferedActivityToggles = [
    DegreeIds.Root,
  ] as ReadonlyArray<DegreeIds>
  const nextBufferedActivityToggles = reduceToEmptyBufferedActivityToggles(
    prevBufferedActivityToggles
  )
  expect(nextBufferedActivityToggles).toStrictEqual([])
})
