import { useSizes } from '../use-sizes'
import { menuStashedScale } from '../../constants'

export const useScaledMenuLabelProtrusion = (): number => {
  const {
    dynamicSizes: { labelProtrusion: unscaledLabelProtrusion },
  } = useSizes()
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuStashedScale
  return scaledLabelProtrusion
}
