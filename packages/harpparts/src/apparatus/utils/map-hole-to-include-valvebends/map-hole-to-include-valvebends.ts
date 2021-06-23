import type { Hole } from '../../types'

export const mapHoleToIncludeValvebends = (holeInput: Hole): Hole => {
  const { blow } = holeInput
  return { ...holeInput, valvebends: [blow - 1] }
}
