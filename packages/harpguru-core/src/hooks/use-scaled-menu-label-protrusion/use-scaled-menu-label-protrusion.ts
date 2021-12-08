import { useGlobal } from 'reactn'

import { menuStashedScale } from '../../constants'

export const useScaledMenuLabelProtrusion = (): number => {
  const [dynamicSizes] = useGlobal('dynamicSizes')
  const { labelProtrusion: unscaledLabelProtrusion } = dynamicSizes
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuStashedScale
  return scaledLabelProtrusion
}
