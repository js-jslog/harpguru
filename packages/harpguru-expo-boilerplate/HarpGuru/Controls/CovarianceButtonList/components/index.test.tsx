import React from 'react'
import { PitchIds, PozitionIds } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { keyCHarpStrata } from '../../testResources'
import { CovariantMembers } from '../../CovarianceSeries'
import type { CovariancePrimer } from '../../CovarianceSeries'

import { CovarianceButtonList } from './index'

test('A list is produced with multiple PozitionControllers CovarianceButton in it', () => {
  const harpStrataControlProps = {
    setActiveHarpStrata: jest.fn(),
    activeHarpStrata: keyCHarpStrata, 
  }
  const pozitionByKeyAtPitchPrimer: CovariancePrimer = {
    lockedType: CovariantMembers.RootPitch,
    variedType: CovariantMembers.HarpKey,
    lockedValue: PitchIds.C,
    variedValue: PitchIds.C,
  }
  const covarianceButtonListProps = { ...harpStrataControlProps, ...pozitionByKeyAtPitchPrimer }
  const { getByText } = render(<CovarianceButtonList {...covarianceButtonListProps} />)

  const expectedText1 = `${PitchIds.C} ${PozitionIds.First}`
  const expectedText2 = `${PitchIds.F} ${PozitionIds.Second}`
  const expectedText3 = `${PitchIds.G} ${PozitionIds.Twelfth}`
  const expectedText4 = `${PitchIds.Db} ${PozitionIds.Sixth}`
  const expectedText5 = `${PitchIds.B} ${PozitionIds.Eighth}`
  expect(getByText(expectedText1)).toBeTruthy()
  expect(getByText(expectedText2)).toBeTruthy()
  expect(getByText(expectedText3)).toBeTruthy()
  expect(getByText(expectedText4)).toBeTruthy()
  expect(getByText(expectedText5)).toBeTruthy()
})
