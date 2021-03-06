import { useGlobal } from 'reactn'
import type { Degree, Pitch } from 'harpparts'

import type { YXCoord } from '../../../harp-cell'
import {
  inactiveCellsHarpStrata,
  activeCellsHarpStrata,
} from '../../../../test-resources'

import { usePositionAnalysis } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const {
  degreeMatrix: [, , , [, , , y3x3Degree]],
} = inactiveCellsHarpStrata
const {
  pitchMatrix: [, , , [, , , y3x3Pitch]],
} = inactiveCellsHarpStrata

const ourDegree = <Degree>y3x3Degree
const ourPitch = <Pitch>y3x3Pitch

test('thisIsActive is true if the cell is active or false otherwise', () => {
  const ourCoord: YXCoord = [3, 3]
  mockUseGlobal.mockReturnValue([activeCellsHarpStrata])
  const { thisIsActive: active } = usePositionAnalysis(ourCoord)
  expect(active).toBe(true)

  mockUseGlobal.mockReturnValue([inactiveCellsHarpStrata])
  const { thisIsActive: inactive } = usePositionAnalysis(ourCoord)
  expect(inactive).toBe(false)

  const emptyCoord: YXCoord = [0, 0]
  const { thisIsActive: empty } = usePositionAnalysis(emptyCoord)
  expect(empty).toBe(false)
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

test('thisDegree and thisPitch provide an object when available and undefined otherwise', () => {
  const ourCoord: YXCoord = [3, 3]
  const { thisDegree, thisPitch } = usePositionAnalysis(ourCoord)
  expect(ourDegree).not.toBe(undefined)
  expect(ourDegree.id).toBeTruthy()
  expect(thisDegree).toStrictEqual(ourDegree)
  expect(thisPitch).toStrictEqual(ourPitch)

  const emptyCoord: YXCoord = [0, 0]
  const {
    thisDegree: undefinedDegree,
    thisPitch: undefinedPitch,
  } = usePositionAnalysis(emptyCoord)
  expect(undefinedDegree).toBe(undefined)
  expect(undefinedPitch).toBe(undefined)
})
