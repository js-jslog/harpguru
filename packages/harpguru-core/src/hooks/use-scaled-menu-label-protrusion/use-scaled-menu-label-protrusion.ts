import { useDimensions } from '@react-native-community/hooks'

import { getSizes } from '../../styles'
import { menuStashedScale } from '../../constants'

export const useScaledMenuLabelProtrusion = (): number => {
  const { labelProtrusion: unscaledLabelProtrusion } = getSizes(
    useDimensions().window
  )
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuStashedScale
  return scaledLabelProtrusion
}
