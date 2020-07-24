import { useGlobal } from 'reactn'
import React from 'react'
import { ApparatusIds, PozitionIds, PitchIds, getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, ActiveIds } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { DisplayModes } from '../../../../types'
import { ExperienceModes } from '../../../../helpers/setGlobalReactNState'

import { LayoutMenu } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const harpStrataProps: HarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [] as ActiveIds,
}
const harpStrata = getHarpStrata(harpStrataProps)
mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeHarpStrata') return [harpStrata]
  if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
  return undefined
})

test('LayoutMenu renders a component with a major diatonic layout selected', () => {
  const menuProps = {
    activeDisplayMode: DisplayModes.Degree,
    setActiveDisplayMode: jest.fn(),
  }
  const { getByText } = render(<LayoutMenu {...menuProps} />)

  expect(getByText(ApparatusIds.MajorDiatonic)).toBeTruthy()
})

test('LayoutMenu renders a component with Degree DisplayMode selected', () => {
  const menuProps = {
    activeDisplayMode: DisplayModes.Degree,
    setActiveDisplayMode: jest.fn(),
  }
  const { getByText } = render(<LayoutMenu {...menuProps} />)

  expect(getByText(DisplayModes.Degree)).toBeTruthy()
})

test('LayoutMenu renders a component with Explore ExperienceMode selected', () => {
  const menuProps = {
    activeDisplayMode: DisplayModes.Degree,
    setActiveDisplayMode: jest.fn(),
  }
  const { getByText } = render(<LayoutMenu {...menuProps} />)

  expect(getByText(ExperienceModes.Explore)).toBeTruthy()
})