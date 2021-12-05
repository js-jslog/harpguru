import { useGlobal } from 'reactn'

import { menuStashedScale } from '../../constants'

export const useScaledMenuLabelProtrusion = (): number => {
  const {
    [0]: { labelProtrusion: unscaledLabelProtrusion },
  } = useGlobal('dynamicSizes')
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuStashedScale
  return scaledLabelProtrusion
}
