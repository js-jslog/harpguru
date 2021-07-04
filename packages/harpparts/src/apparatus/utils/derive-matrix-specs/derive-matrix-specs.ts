import { reduceHoleForBiggestBends } from '../reduce-hole-for-biggest-bends'
import type { HoleArray, MatrixSpecs } from '../../types'

export const deriveMatrixSpecs = (holeArray: HoleArray): MatrixSpecs => {
  const { biggestBlow, biggestDraw } = holeArray.reduce(
    reduceHoleForBiggestBends,
    {
      biggestBlow: 0,
      biggestDraw: 0,
    }
  )

  const homeRowHeight = 2
  const height = biggestBlow + biggestDraw + homeRowHeight
  return {
    height,
    blowRow: biggestBlow,
  }
}
