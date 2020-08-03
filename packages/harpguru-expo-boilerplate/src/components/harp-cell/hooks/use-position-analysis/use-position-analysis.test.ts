import { useGlobal } from 'reactn'
import type { Degree, IsActiveIds, Pitch } from 'harpstrata'

import type { YXCoord } from '../../harp-cell'
import { inactiveCellsHarpStrata as activeHarpStrata } from '../../../../test-resources'

import { usePositionAnalysis } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock
mockUseGlobal.mockReturnValue([activeHarpStrata])

const {
  degreeMatrix: [, , , [, , , y3x3Degree]],
} = activeHarpStrata
const {
  pitchMatrix: [, , , [, , , y3x3Pitch]],
} = activeHarpStrata
const {
  isActiveComplex: {
    isActiveMatrix: [, , , [, , , y3x3IsActive]],
  },
} = activeHarpStrata

const ourDegree = <Degree>y3x3Degree
const ourPitch = <Pitch>y3x3Pitch
const ourIsActive = <IsActiveIds>y3x3IsActive

test('thisIsActiveId provides the isActiveId at if available and undefined otherwise', () => {
  const ourCoord: YXCoord = [3, 3]
  const { thisIsActiveId } = usePositionAnalysis(ourCoord)
  expect(thisIsActiveId).toBe(ourIsActive)

  const emptyCoord: YXCoord = [0, 0]
  const { thisIsActiveId: emptyIsActiveId } = usePositionAnalysis(emptyCoord)
  expect(emptyIsActiveId).toBe(undefined)
})

test('thisDegreeId and thisPitchId provide an id when available and undefined otherwise', () => {
  const ourCoord: YXCoord = [3, 3]
  const { thisDegreeId, thisPitchId } = usePositionAnalysis(ourCoord)
  expect(ourDegree).not.toBe(undefined)
  expect(ourDegree.id).toBeTruthy()
  expect(thisDegreeId).toBe(ourDegree.id)
  expect(thisPitchId).toBe(ourPitch.id)

  const emptyCoord: YXCoord = [0, 0]
  const {
    thisDegreeId: undefinedDegreeId,
    thisPitchId: undefinedPitchId,
  } = usePositionAnalysis(emptyCoord)
  expect(undefinedDegreeId).toBe(undefined)
  expect(undefinedPitchId).toBe(undefined)
})
