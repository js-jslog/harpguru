import { biggestBendsReducerCallback } from '../biggest-bends-reducer-callback'
import type { HoleArray, MatrixSpecs } from '../../types'

export const deriveMatrixSpecs = (holeArray: HoleArray): MatrixSpecs => {
  const { biggestBlow, biggestDraw } = holeArray.reduce(
    biggestBendsReducerCallback,
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
