import { DegreeIds } from 'harpparts'

import { rebufferForInput } from './rebuffer-for-input'

test('rebufferForInput returns the input if the activeHarpStrata is clear', () => {
  const activeDegrees = [] as ReadonlyArray<DegreeIds>
  const targetActiveDegrees = [DegreeIds.Root, DegreeIds.Third, DegreeIds.Fifth]

  const expectedBuffers = targetActiveDegrees

  const actualBuffers = rebufferForInput(activeDegrees, targetActiveDegrees)

  expect(actualBuffers).toStrictEqual(expectedBuffers)
})
