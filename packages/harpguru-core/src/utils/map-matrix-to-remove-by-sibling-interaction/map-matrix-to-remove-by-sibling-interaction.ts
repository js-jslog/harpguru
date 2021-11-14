import { HarpFaceMatrix } from 'harpparts'

import { mapRowToRemoveBySiblingInteraction } from '../map-row-to-remove-by-sibling-interaction'
import type { SupportInteractionProps } from '../map-row-to-remove-by-sibling-interaction'

type MapMatrixToRemoveBySiblingInteractionProps<T> = SupportInteractionProps & {
  readonly matrix: HarpFaceMatrix<T>
}

export const mapMatrixToRemoveBySiblingInteraction = <T>(
  props: MapMatrixToRemoveBySiblingInteractionProps<T>
): HarpFaceMatrix<T> => {
  return props.matrix.map(
    mapRowToRemoveBySiblingInteraction.bind(undefined, props)
  ) as HarpFaceMatrix<T>
}
