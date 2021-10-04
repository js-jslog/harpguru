import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

// TODO: remove this import. Work on test data construction instead and make
// the mock objects easier to construct.
import { deriveViewableInteractionMatrix } from '../new-harpstrata-state-callback/utils'
import { DisplayModes, ExperienceModes } from '../../types'
import { inactiveCellsHarpStrata } from '../../test-resources'

import { HarpFaceFragment } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('A snapshot of an unbounded HarpFaceFragment', () => {
  const layoutFacts = {
    harpfaceColumns: 10,
    harpfaceRows: 7,
  }
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeDegreeMatrix')
      return [inactiveCellsHarpStrata.degreeMatrix]
    if (stateItem === 'activePitchMatrix')
      return [inactiveCellsHarpStrata.pitchMatrix]
    if (stateItem === 'activeInteractionMatrix')
      return [inactiveCellsHarpStrata.apparatus.interactionMatrix]
    if (stateItem === 'viewableInteractionMatrix')
      return [inactiveCellsHarpStrata.apparatus.interactionMatrix]
    if (stateItem === 'activeDegreeIds')
      return [inactiveCellsHarpStrata.activeDegreeIds]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    if (stateItem === 'layoutFacts') return [layoutFacts]
    if (stateItem === 'columnBounds') return ['FIT']
    return undefined
  })

  const { toJSON } = render(
    <HarpFaceFragment xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
  )

  expect(toJSON()).toMatchSnapshot()
})

test('A snapshot of a bounded HarpFaceFragment - we should expect fewer rows since the double blowbend is not present', () => {
  // TODO: These mock implementations should really
  // be deducable rather than manually setup each time
  const layoutFacts = {
    harpfaceColumns: 9,
    harpfaceRows: 6,
  }
  const viewableInteractionMatrix = deriveViewableInteractionMatrix(
    inactiveCellsHarpStrata.apparatus.interactionMatrix,
    [0, 8]
  )
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeDegreeMatrix')
      return [inactiveCellsHarpStrata.degreeMatrix, jest.fn()]
    if (stateItem === 'activePitchMatrix')
      return [inactiveCellsHarpStrata.pitchMatrix, jest.fn()]
    if (stateItem === 'activeInteractionMatrix')
      return [inactiveCellsHarpStrata.apparatus.interactionMatrix, jest.fn()]
    if (stateItem === 'viewableInteractionMatrix')
      return [viewableInteractionMatrix]
    if (stateItem === 'activeDegreeIds')
      return [inactiveCellsHarpStrata.activeDegreeIds]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    if (stateItem === 'layoutFacts') return [layoutFacts]
    if (stateItem === 'columnBounds') return [[0, 8]]
    return undefined
  })

  const { toJSON } = render(
    <HarpFaceFragment xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8]} />
  )

  expect(toJSON()).toMatchSnapshot()
})
