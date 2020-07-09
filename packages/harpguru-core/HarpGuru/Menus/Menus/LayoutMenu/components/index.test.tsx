import React from 'react'
import {PitchIds, PozitionIds, HarpStrataProps, ApparatusIds, ActiveIds, getHarpStrata} from 'harpstrata'
import {render} from '@testing-library/react-native'

import {DisplayModes} from '../../../../HarpFace'

import { LayoutMenu } from './index'

const harpStrataProps: HarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
  activeIds: [] as ActiveIds,
}

const harpStrata = getHarpStrata(harpStrataProps)

test('LayoutMenu renders a component with a major diatonic layout selected', () => {
  const menuProps = {
    activeHarpStrata: harpStrata,
    setActiveHarpStrata: jest.fn(),
    activeDisplayMode: DisplayModes.Degree,
    setActiveDisplayMode: jest.fn()
  }
  const { getByText } = render(<LayoutMenu {...menuProps} />)

  expect(getByText(ApparatusIds.MajorDiatonic)).toBeTruthy()
})

test('LayoutMenu renders a component with Degree DisplayMode selected', () => {
  const menuProps = {
    activeHarpStrata: harpStrata,
    setActiveHarpStrata: jest.fn(),
    activeDisplayMode: DisplayModes.Degree,
    setActiveDisplayMode: jest.fn()
  }
  const { getByText } = render(<LayoutMenu {...menuProps} />)

  expect(getByText(DisplayModes.Degree)).toBeTruthy()
})
