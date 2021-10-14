import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import { DisplayModes } from '../../../../types'

import { reduceValvingIdToHarpStrata } from './reduce-valivingid-to-harpstrata'

const baseHarpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const unvalvedHarpProps = baseHarpStrataProps
const valvedHarpProps = {
  ...baseHarpStrataProps,
  valvingId: ValvingIds.HalfValved,
}

const unvalvedHarp = getHarpStrata(unvalvedHarpProps)
const valvedHarp = getHarpStrata(valvedHarpProps)

test('provides HarpStrata updated to exclude valving', () => {
  const activeHarpStrata = valvedHarp
  const { Degree: activeDisplayMode } = DisplayModes
  const { NotValved: valvingId } = ValvingIds

  const newActiveHarpStrata = reduceValvingIdToHarpStrata(
    activeHarpStrata,
    activeDisplayMode,
    valvingId
  )

  expect(newActiveHarpStrata).toStrictEqual(unvalvedHarp)
})

test('provides HarpStrata updated to include valving', () => {
  const activeHarpStrata = unvalvedHarp
  const { Degree: activeDisplayMode } = DisplayModes
  const { HalfValved: valvingId } = ValvingIds

  const newActiveHarpStrata = reduceValvingIdToHarpStrata(
    activeHarpStrata,
    activeDisplayMode,
    valvingId
  )

  expect(newActiveHarpStrata).toStrictEqual(valvedHarp)
})
