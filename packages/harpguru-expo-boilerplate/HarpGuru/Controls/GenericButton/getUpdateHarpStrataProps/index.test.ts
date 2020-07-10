import { PozitionIds, PitchIds } from 'harpstrata'

import { UpdateCategories } from '../types'
import type { GenericButtonProps } from '../types'
import { firstPozitionHarpStrata, keyCHarpStrata } from '../testResources'
import { getPropsForHarpStrata } from '../../ControlHelpers'
import { DisplayModes } from '../../../HarpFace'

import { getUpdateHarpStrataProps } from './index'

test('getUpdateHarpStrataProps provides amended HarpStrataProps for a given Pozition update', () => {
  const sourceHarpStrata = firstPozitionHarpStrata

  const baseHarpStrataProps = getPropsForHarpStrata(
    sourceHarpStrata,
    DisplayModes.Degree
  )

  const expectedHarpStrataProps = {
    ...baseHarpStrataProps,
    pozitionId: PozitionIds.Third,
  }

  const { Pozition: updateCategory } = UpdateCategories
  const pozitionUpdateProps: GenericButtonProps = {
    activeHarpStrata: keyCHarpStrata,
    setActiveHarpStrata: jest.fn(),
    updateCategory,
    id: PozitionIds.Third,
  }
  const actualHarpStrataProps = getUpdateHarpStrataProps(pozitionUpdateProps)

  expect(actualHarpStrataProps).toStrictEqual(expectedHarpStrataProps)
})

test('getUpdateHarpStrataProps provides amended HarpStrataProps for a given Harp Key update', () => {
  const sourceHarpStrata = keyCHarpStrata

  const baseHarpStrataProps = getPropsForHarpStrata(
    sourceHarpStrata,
    DisplayModes.Degree
  )

  const expectedHarpStrataProps = {
    ...baseHarpStrataProps,
    harpKeyId: PitchIds.D,
  }

  const { HarpKey: updateCategory } = UpdateCategories
  const harpKeyUpdateProps: GenericButtonProps = {
    activeHarpStrata: keyCHarpStrata,
    setActiveHarpStrata: jest.fn(),
    updateCategory,
    id: PitchIds.D,
  }
  const actualHarpStrataProps = getUpdateHarpStrataProps(harpKeyUpdateProps)

  expect(actualHarpStrataProps).toStrictEqual(expectedHarpStrataProps)
})
