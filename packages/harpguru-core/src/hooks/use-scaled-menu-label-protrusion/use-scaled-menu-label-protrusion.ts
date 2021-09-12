import { useSizes } from '../../styles'
import { menuStashedScale } from '../../constants'

export const useScaledMenuLabelProtrusion = (): number => {
  const { labelProtrusion: unscaledLabelProtrusion } = useSizes()
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuStashedScale
  return scaledLabelProtrusion
}
