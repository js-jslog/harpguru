import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

// TODO: remove this import. Work on test data construction instead and make
// the mock objects easier to construct.
import { deriveViewableMatrix } from '../new-harpstrata-state-callback/utils'
import { DisplayModes, ExperienceModes } from '../../types'
import { inactiveCellsHarpStrata } from '../../test-resources'

import { HarpFace } from './harp-face'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('A component is rendered with fragmented face', () => {
  // TODO: Should be shared resource
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
    if (stateItem === 'fragmentHarpFaceByOctaves') return [true]
    if (stateItem === 'layoutFacts') return [layoutFacts]
    if (stateItem === 'columnBounds') return ['FIT']
    return undefined
  })
  const { toJSON } = render(<HarpFace />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with unfragmented face', () => {
  // TODO: Should be shared resource
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
    if (stateItem === 'fragmentHarpFaceByOctaves') return [false]
    if (stateItem === 'layoutFacts') return [layoutFacts]
    if (stateItem === 'columnBounds') return ['FIT']
    return undefined
  })
  const { toJSON } = render(<HarpFace />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with fragmented and bounded face', () => {
  // TODO: Should be shared resource
  const layoutFacts = {
    harpfaceColumns: 6,
    harpfaceRows: 6,
  }
  const viewableInteractionMatrix = deriveViewableMatrix(
    inactiveCellsHarpStrata.apparatus.interactionMatrix,
    [2, 7]
  )
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeDegreeMatrix')
      return [inactiveCellsHarpStrata.degreeMatrix]
    if (stateItem === 'activePitchMatrix')
      return [inactiveCellsHarpStrata.pitchMatrix]
    if (stateItem === 'activeInteractionMatrix')
      return [inactiveCellsHarpStrata.apparatus.interactionMatrix]
    if (stateItem === 'viewableInteractionMatrix')
      return [viewableInteractionMatrix]
    if (stateItem === 'activeDegreeIds')
      return [inactiveCellsHarpStrata.activeDegreeIds]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    if (stateItem === 'fragmentHarpFaceByOctaves') return [true]
    if (stateItem === 'layoutFacts') return [layoutFacts]
    if (stateItem === 'columnBounds') return [[2, 7]]
    return undefined
  })
  const { toJSON } = render(<HarpFace />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with unfragmented and bounded face', () => {
  // TODO: Should be shared resource
  const layoutFacts = {
    harpfaceColumns: 6,
    harpfaceRows: 6,
  }
  const viewableInteractionMatrix = deriveViewableMatrix(
    inactiveCellsHarpStrata.apparatus.interactionMatrix,
    [2, 7]
  )
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeDegreeMatrix')
      return [inactiveCellsHarpStrata.degreeMatrix]
    if (stateItem === 'activePitchMatrix')
      return [inactiveCellsHarpStrata.pitchMatrix]
    if (stateItem === 'activeInteractionMatrix')
      return [inactiveCellsHarpStrata.apparatus.interactionMatrix]
    if (stateItem === 'viewableInteractionMatrix')
      return [viewableInteractionMatrix]
    if (stateItem === 'activeDegreeIds')
      return [inactiveCellsHarpStrata.activeDegreeIds]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    if (stateItem === 'fragmentHarpFaceByOctaves') return [false]
    if (stateItem === 'layoutFacts') return [layoutFacts]
    if (stateItem === 'columnBounds') return [[2, 7]]
    return undefined
  })
  const { toJSON } = render(<HarpFace />)

  expect(toJSON()).toMatchSnapshot()
})
