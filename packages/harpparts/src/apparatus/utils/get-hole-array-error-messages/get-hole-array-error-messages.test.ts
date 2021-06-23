import { HoleErrors } from '../is-hole-valid'
import { Hole, HoleArray } from '../../types'

import { getHoleArrayErrorMessages } from './get-hole-array-error-messages'

test('getHoleArrayErrorMessages returns empty array when no errors are found', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  const holeArray = [
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
  ] as HoleArray
  const holeArrayErrorMessages = getHoleArrayErrorMessages(holeArray)

  expect(holeArrayErrorMessages).toStrictEqual([])
})

test('getHoleArrayErrorMessages returns an array containing an error message for the first hole when relevant', () => {
  const errorHole: Hole = {
    blow: 0,
    draw: 3,
    bends: [2, 1],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  const holeArray = [
    errorHole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
    hole,
  ] as HoleArray
  const holeArrayErrorMessages = getHoleArrayErrorMessages(holeArray)

  expect(holeArrayErrorMessages).toStrictEqual([
    `Hole 0: ${HoleErrors.NonconsecutiveBends}`,
  ])
})
