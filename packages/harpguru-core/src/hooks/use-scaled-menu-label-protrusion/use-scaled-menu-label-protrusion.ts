import { useHarpGuruStore } from '../../store'
import { menuStashedScale } from '../../constants'

export const useScaledMenuLabelProtrusion = (): number => {
  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const { labelProtrusion: unscaledLabelProtrusion } = dynamicSizes
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuStashedScale
  return scaledLabelProtrusion
}
