import { ApparatusIds } from './types'
import { getActiveApparatusIds, getApparatus } from './index'
import { MAJOR_DIATONIC_APPARATUS } from './constants'

test('getActiveApparatusIds function returns an array of the available apparatus Ids', () => {
  const appratusIds = getActiveApparatusIds()
  expect(appratusIds.includes(ApparatusIds.MajorDiatonic)).toBeTruthy()
})

test('getApparatus function can return a major diatonic apparatus', () => {
  const actualApparatus = getApparatus(ApparatusIds.MajorDiatonic)

  expect(actualApparatus).toStrictEqual(MAJOR_DIATONIC_APPARATUS)
})
