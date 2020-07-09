import { getHarpStrata, DegreeIds, PitchIds } from 'harpstrata'

import { keyCHarpStrata, keyCHarpStrataProps } from '../../testResources'
import {DisplayModes} from '../../../HarpFace'

import { getPropsForHarpStrata } from './index'

test('given a HarpStrata, getPropsForHarpStrata supplies the props to generate the exact same HarpStrata again', () => {
  const sourceHarpStrata = keyCHarpStrata

  const derivedHarpStrataProps = getPropsForHarpStrata(sourceHarpStrata, DisplayModes.Pitch)

  expect(getHarpStrata(derivedHarpStrataProps)).toStrictEqual(sourceHarpStrata)
})

// This is important if the purpose of the returned object is for use in generating a similar harpstrata
// but with an altered detail. The pitch and degree arrays of the next harpstrata will no longer match so
// the calling function needs to state the display mode required in order to preserve the active Ids
// which are actually important (ie the ones which are displayed currently)
test('the `activeIds` array is made of pitches when the display mode is Pitch', () => {
  const sourceHarpStrata = getHarpStrata({...keyCHarpStrataProps, activeIds: [DegreeIds.Root]})

  const derivedHarpStrataProps = getPropsForHarpStrata(sourceHarpStrata, DisplayModes.Pitch)
  const expectedActiveIds = [PitchIds.C]
  const { activeIds: actualActiveIds } = derivedHarpStrataProps

  expect(actualActiveIds).toStrictEqual(expectedActiveIds)
})

test('the `activeIds` array is made of Degrees when the display mode is Degree', () => {
  const sourceHarpStrata = getHarpStrata({...keyCHarpStrataProps, activeIds: [PitchIds.C]})

  const derivedHarpStrataProps = getPropsForHarpStrata(sourceHarpStrata, DisplayModes.Degree)
  const expectedActiveIds = [DegreeIds.Root]
  const { activeIds: actualActiveIds } = derivedHarpStrataProps

  expect(actualActiveIds).toStrictEqual(expectedActiveIds)
})
