import { orderedScales } from '../constants'
import type { ScaleIds, Scale } from '../../scale'

export const getScale = (scaleId: ScaleIds): Scale => {
  const scale = orderedScales.get(scaleId)
  if (scale === undefined) throw 'A scale id for an unlisted scale was used'
  return scale
}
