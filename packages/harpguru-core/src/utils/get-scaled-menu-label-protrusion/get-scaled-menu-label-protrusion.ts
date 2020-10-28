import { getSizes } from '../../styles'
import { menuHiddenScale } from '../../constants'

export const getScaledMenuLabelProtrusion = (): number => {
  const { labelProtrusion: unscaledLabelProtrusion } = getSizes()
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuHiddenScale
  return scaledLabelProtrusion
}
