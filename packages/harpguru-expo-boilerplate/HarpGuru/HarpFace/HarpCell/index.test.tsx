import {render as renderAlt, fireEvent} from 'react-native-testing-library'
import React from 'react'
import { PitchIds, DegreeIds } from 'harpstrata'
import {render} from '@testing-library/react-native'

import { DisplayModes } from '../HarpFace'
import { exampleHarpFaceProps } from '../HarpFace'

import {HarpCell} from './index'

test('A component is rendered with the Degree or Pitch value in its text view depending on the DisplayMode selected', () => {
  const harpFaceProps = { ...exampleHarpFaceProps, activeDisplayMode: DisplayModes.Degree }
  const {getByText, rerender} = render(<HarpCell {...harpFaceProps} yxCoord={[3,0]} />)

  expect(getByText(DegreeIds.Second)).toBeTruthy()

  rerender(<HarpCell {...harpFaceProps} activeDisplayMode={DisplayModes.Pitch} yxCoord={[3,0]} />)

  expect(getByText(PitchIds.D)).toBeTruthy()
})

test('A component is rendered with an a11y role of button', () => {
  const harpFaceProps = { ...exampleHarpFaceProps, activeDisplayMode: DisplayModes.Degree }
  const { getByA11yRole  } = renderAlt(<HarpCell {...harpFaceProps} yxCoord={[3,0]} />)

  expect(getByA11yRole('button')).toBeTruthy()
})

test('A component is rendered without an a11y role of button if it has no content', () => {
  const harpFaceProps = { ...exampleHarpFaceProps, activeDisplayMode: DisplayModes.Degree }
  const { queryByA11yRole  } = renderAlt(<HarpCell {...harpFaceProps} yxCoord={[0,0]} />)

  expect(queryByA11yRole('button')).toBeNull()
})

test('A press of the componenet results in toggled active ids in the harpstrata passed to the paramaterised setter', () => {
  const setActiveHarpStrata = jest.fn()
  const harpFaceProps = { ...exampleHarpFaceProps, activeDisplayMode: DisplayModes.Degree, setActiveHarpStrata }

  const {getByA11yRole} = renderAlt(<HarpCell {...harpFaceProps} yxCoord={[3,0]} />)

  fireEvent.press(getByA11yRole('button'))

  const { mock: { calls: [[ newHarpStrata ]]}} = setActiveHarpStrata
  const { isActiveComplex: { activeDegreeIds: newDegreeIds, activePitchIds: newPitchIds }} = newHarpStrata

  const expectedDegreeIds = [DegreeIds.Second]
  const expectedPitchIds = [PitchIds.D]

  expect(setActiveHarpStrata.mock.calls.length).toBe(1)  
  expect(newDegreeIds).toStrictEqual(expectedDegreeIds)
  expect(newPitchIds).toStrictEqual(expectedPitchIds)
})
