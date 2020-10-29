import { getSizes } from '../../styles'
import { menuStashedScale } from '../../constants'

export const getScaledMenuLabelProtrusion = (): number => {
  const { labelProtrusion: unscaledLabelProtrusion } = getSizes()
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuStashedScale
  return scaledLabelProtrusion
}
