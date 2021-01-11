import { DegreeIds } from 'harpparts'

import { rebufferForInput } from './rebuffer-for-input'

test('rebufferForInput returns the input if the activeHarpStrata is clear', () => {
  const activeDegrees = [] as ReadonlyArray<DegreeIds>
  const targetActiveDegrees = [DegreeIds.Root, DegreeIds.Third, DegreeIds.Fifth]

  const expectedBuffers = targetActiveDegrees

  const actualBuffers = rebufferForInput(activeDegrees, targetActiveDegrees)

  expect(actualBuffers).toStrictEqual(expectedBuffers)
})

test('rebufferForInput returns and empty array if the scale is already active', () => {
  const activeDegrees = [DegreeIds.Root, DegreeIds.Third, DegreeIds.Fifth]
  const targetActiveDegrees = [DegreeIds.Root, DegreeIds.Third, DegreeIds.Fifth]

  const expectedBuffers = [] as ReadonlyArray<DegreeIds>

  const actualBuffers = rebufferForInput(activeDegrees, targetActiveDegrees)

  expect(actualBuffers).toStrictEqual(expectedBuffers)
})

test('rebufferForInput returns the target array minus the degree in the active degrees', () => {
  const activeDegrees = [DegreeIds.Root]
  const targetActiveDegrees = [DegreeIds.Root, DegreeIds.Third, DegreeIds.Fifth]

  const expectedBuffers = [DegreeIds.Third, DegreeIds.Fifth]

  const actualBuffers = rebufferForInput(activeDegrees, targetActiveDegrees)

  expect(actualBuffers).toStrictEqual(expectedBuffers)
})

test('rebufferForInput returns the target array minus the degree in the active degrees plus a negation toggle for the unwanted active degree', () => {
  const activeDegrees = [DegreeIds.Root, DegreeIds.Flat6]
  const targetActiveDegrees = [DegreeIds.Root, DegreeIds.Third, DegreeIds.Fifth]

  const expectedBuffers = [DegreeIds.Flat6, DegreeIds.Third, DegreeIds.Fifth]

  const actualBuffers = rebufferForInput(activeDegrees, targetActiveDegrees)

  expect(actualBuffers).toStrictEqual(expectedBuffers)
})
