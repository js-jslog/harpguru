import { useSizes } from '../use-sizes'
import { menuStashedScale } from '../../constants'

export const useScaledMenuLabelProtrusion = (): number => {
  const { labelProtrusion: unscaledLabelProtrusion, 10: testi } = useSizes()
  console.log(
    '::::::::::::::::::::::::::::: useScaledMenuLabelProtrusion: ' + testi
  )
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuStashedScale
  return scaledLabelProtrusion
}
