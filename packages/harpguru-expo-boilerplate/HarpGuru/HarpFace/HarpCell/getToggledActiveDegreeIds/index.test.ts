import { DegreeIds } from 'harpstrata'
import type { ActiveDegreeIds } from 'harpstrata'

import { getToggledActiveDegreeIds } from './index'

test('getToggledActiveDegreeIds will take a DegreeId and add it to an ActiveDegreeIds which doesnt already have the Id in it', () => {
  const activeDegreeIds: ActiveDegreeIds = []
  const { Root: degreeId } = DegreeIds
  const expectedActiveDegreeIds: ActiveDegreeIds = [DegreeIds.Root]

  const actualActiveDegreeIds = getToggledActiveDegreeIds(
    degreeId,
    activeDegreeIds
  )

  expect(actualActiveDegreeIds).toEqual(expectedActiveDegreeIds)
})

test('getToggledActiveDegreeIds will take a DegreeId and remove it from an ActiveDegreeIds which only has that Id in it', () => {
  const activeDegreeIds: ActiveDegreeIds = [DegreeIds.Root]
  const { Root: degreeId } = DegreeIds
  const expectedActiveDegreeIds: ActiveDegreeIds = []

  const actualActiveDegreeIds = getToggledActiveDegreeIds(
    degreeId,
    activeDegreeIds
  )

  expect(actualActiveDegreeIds).toEqual(expectedActiveDegreeIds)
})

test('getToggledActiveDegreeIds will take a DegreeId and remove it from the end of an ActiveDegreeIds which does already have the Id in it', () => {
  const activeDegreeIds: ActiveDegreeIds = [DegreeIds.Second, DegreeIds.Root]
  const { Root: degreeId } = DegreeIds
  const expectedActiveDegreeIds: ActiveDegreeIds = [DegreeIds.Second]

  const actualActiveDegreeIds = getToggledActiveDegreeIds(
    degreeId,
    activeDegreeIds
  )

  expect(actualActiveDegreeIds).toEqual(expectedActiveDegreeIds)
})

test('getToggledActiveDegreeIds will take a DegreeId and remove it from the start of an ActiveDegreeIds which does already have the Id in it', () => {
  const activeDegreeIds: ActiveDegreeIds = [DegreeIds.Root, DegreeIds.Second]
  const { Root: degreeId } = DegreeIds
  const expectedActiveDegreeIds: ActiveDegreeIds = [DegreeIds.Second]

  const actualActiveDegreeIds = getToggledActiveDegreeIds(
    degreeId,
    activeDegreeIds
  )

  expect(actualActiveDegreeIds).toEqual(expectedActiveDegreeIds)
})

test('getToggledActiveDegreeIds will take a DegreeId and remove it from the middle of an ActiveDegreeIds which does already have the Id in it', () => {
  const activeDegreeIds: ActiveDegreeIds = [
    DegreeIds.Third,
    DegreeIds.Fourth,
    DegreeIds.Root,
    DegreeIds.Second,
  ]
  const { Root: degreeId } = DegreeIds
  const expectedActiveDegreeIds: ActiveDegreeIds = [
    DegreeIds.Third,
    DegreeIds.Fourth,
    DegreeIds.Second,
  ]

  const actualActiveDegreeIds = getToggledActiveDegreeIds(
    degreeId,
    activeDegreeIds
  )

  expect(actualActiveDegreeIds).toEqual(expectedActiveDegreeIds)
})
