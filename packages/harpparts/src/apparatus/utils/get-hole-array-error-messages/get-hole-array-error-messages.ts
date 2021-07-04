import { isHoleValid } from '../is-hole-valid'
import { HoleArray } from '../../types'

export const getHoleArrayErrorMessages = (holeArray: HoleArray): string[] => {
  return holeArray
    .map((hole, index) =>
      isHoleValid(hole).map((error) => `Hole ${index}: ${error}`)
    )
    .flat()
}
