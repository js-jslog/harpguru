import { useGlobal } from 'reactn'

import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

// TODO: Add a test
export const useIsZoomed = (): boolean => {
  const [columnBounds] = useGlobal('columnBounds')
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const [viewableInteractionMatrix] = useGlobal('viewableInteractionMatrix')
  if (columnBounds === 'FIT') return false
  if (
    doSparceIdedObjectMatricesMatch(
      fullInteractionMatrix,
      viewableInteractionMatrix
    )
  )
    return false
  return true
}
