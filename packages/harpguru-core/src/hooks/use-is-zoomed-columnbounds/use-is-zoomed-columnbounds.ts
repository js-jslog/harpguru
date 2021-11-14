import { useGlobal } from 'reactn'

import { isMatchHarpFaceMatrices } from '../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

// TODO: Add a test
export const useIsZoomedColumnBounds = ():
  | false
  | readonly [number, number] => {
  const [columnBounds] = useGlobal('columnBounds')
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const [viewableInteractionMatrix] = useGlobal('viewableInteractionMatrix')
  if (columnBounds === 'FIT') return false
  if (
    isMatchHarpFaceMatrices(
      doSparceIdedObjectMatricesMatch,
      fullInteractionMatrix,
      viewableInteractionMatrix
    )
  )
    return false
  return columnBounds
}
