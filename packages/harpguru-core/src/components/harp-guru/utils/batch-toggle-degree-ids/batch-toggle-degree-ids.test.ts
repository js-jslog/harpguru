import { DegreeIds } from 'harpstrata'
import type { ActiveDegreeIds } from 'harpstrata'

import { batchToggleDegreeIds } from './batch-toggle-degree-ids'

test('given an empty active degree list, all the toggle ids are added', () => {
  const activeDegreeIds = [] as ActiveDegreeIds
  const bufferedActivityToggles = [
    DegreeIds.Flat3,
    DegreeIds.Root,
    DegreeIds.Flat7,
  ]

  const newActiveDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    bufferedActivityToggles
  )

  expect(newActiveDegreeIds).toStrictEqual(bufferedActivityToggles)
})

test('given an active degree list with none of the toggled ids, all the toggle ids are added', () => {
  const activeDegreeIds = [DegreeIds.Fourth]
  const bufferedActivityToggles = [
    DegreeIds.Flat3,
    DegreeIds.Root,
    DegreeIds.Flat7,
  ]

  const newActiveDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    bufferedActivityToggles
  )

  expect(newActiveDegreeIds).toStrictEqual([
    ...activeDegreeIds,
    ...bufferedActivityToggles,
  ])
})

test('given an active degree list with all and only the toggled ids, all the toggle ids are removed', () => {
  const activeDegreeIds = [DegreeIds.Flat7, DegreeIds.Root, DegreeIds.Flat3]
  const bufferedActivityToggles = [
    DegreeIds.Flat3,
    DegreeIds.Root,
    DegreeIds.Flat7,
  ]

  const newActiveDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    bufferedActivityToggles
  )

  expect(newActiveDegreeIds).toStrictEqual([])
})

test('given an active degree list with all and the toggled ids and a few more, all the toggle ids are removed', () => {
  const activeDegreeIds = [
    DegreeIds.Flat7,
    DegreeIds.Second,
    DegreeIds.Root,
    DegreeIds.Flat5,
    DegreeIds.Flat3,
  ]
  const bufferedActivityToggles = [
    DegreeIds.Flat3,
    DegreeIds.Root,
    DegreeIds.Flat7,
  ]
  const expectedNewActiveDegreeIds = [DegreeIds.Second, DegreeIds.Flat5]

  const newActiveDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    bufferedActivityToggles
  )

  expect(newActiveDegreeIds).toStrictEqual(expectedNewActiveDegreeIds)
})

test('given an active degree list with some of and the toggled ids, the absent ones are added and the present ones are removed', () => {
  const activeDegreeIds = [
    DegreeIds.Flat7,
    DegreeIds.Second,
    DegreeIds.Root,
    DegreeIds.Flat5,
    DegreeIds.Flat3,
  ]
  const bufferedActivityToggles = [
    DegreeIds.Flat3,
    DegreeIds.Flat2,
    DegreeIds.Root,
    DegreeIds.Flat7,
    DegreeIds.Seventh,
  ]
  const expectedNewActiveDegreeIds = [
    DegreeIds.Second,
    DegreeIds.Flat5,
    DegreeIds.Flat2,
    DegreeIds.Seventh,
  ]

  const newActiveDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    bufferedActivityToggles
  )

  expect(newActiveDegreeIds).toStrictEqual(expectedNewActiveDegreeIds)
})
