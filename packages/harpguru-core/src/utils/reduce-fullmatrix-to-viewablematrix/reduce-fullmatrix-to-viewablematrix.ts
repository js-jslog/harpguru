import { isChromaticHarpFace, InteractionIds } from 'harpparts'
import type { HarpFaceMatrices, Interaction } from 'harpparts'

import { trimFullMatrixByColumnBounds } from '../trim-fullmatrix-by-columnbounds'
import { mapMatrixToRemoveBySiblingInteraction } from '../map-matrix-to-remove-by-sibling-interaction'
import { isMatchHarpFaceFacts } from '../ismatch-harpfacefacts'
import { isPopulatedArray } from '../is-populated-array'
import type { ColumnBounds } from '../../types'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'
import type { IdedObject } from '../../packages/do-sparce-ided-object-matrices-match'

const errorMessage = `
The interaction matrix and sibling matrix should both
be diatonic or chromatic. The should match. Currently
they do not. That should never be the case.
`

export const reduceFullMatrixToViewableMatrix = <T extends IdedObject>(
  prevViewableMatrices: HarpFaceMatrices<T>,
  fullMatrix: HarpFaceMatrices<T>,
  fullInteractionMatrix: HarpFaceMatrices<Interaction>,
  columnBounds: ColumnBounds
): HarpFaceMatrices<T> => {
  const nextViewableMatrix = (() => {
    if (isChromaticHarpFace(fullMatrix)) {
      if (!isChromaticHarpFace(fullInteractionMatrix)) throw Error(errorMessage)
      // TODO: This is rubbish. Can I not find a way to just remove the Blow & Draw
      // from the full list of InteractionIds?
      const removeInteractionIds = [
        InteractionIds.BlowBend1,
        InteractionIds.BlowBend2,
        InteractionIds.BlowBend3,
        InteractionIds.BlowBend4,
        InteractionIds.BlowBend5,
        InteractionIds.DrawBend1,
        InteractionIds.DrawBend2,
        InteractionIds.DrawBend3,
        InteractionIds.DrawBend4,
        InteractionIds.DrawBend5,
        InteractionIds.OverBlow1,
        InteractionIds.OverBlow2,
        InteractionIds.OverDraw1,
        InteractionIds.OverDraw2,
        InteractionIds.ValvedBlow1,
        InteractionIds.ValvedDraw1,
      ]
      const mapForRemovalProps1 = {
        matrix: fullMatrix.harpface1,
        removeInteractionIds,
        interactionMatrix: fullInteractionMatrix.harpface1,
      }
      const withRemovedInteractions1 = mapMatrixToRemoveBySiblingInteraction(
        mapForRemovalProps1
      )
      const harpface1 = trimFullMatrixByColumnBounds(
        withRemovedInteractions1,
        columnBounds
      ).filter(isPopulatedArray)
      const mapForRemovalProps2 = {
        matrix: fullMatrix.harpface2,
        removeInteractionIds,
        interactionMatrix: fullInteractionMatrix.harpface2,
      }
      const withRemovedInteractions2 = mapMatrixToRemoveBySiblingInteraction(
        mapForRemovalProps2
      )
      const harpface2 = trimFullMatrixByColumnBounds(
        withRemovedInteractions2,
        columnBounds
      ).filter(isPopulatedArray)
      return {
        harpface1,
        harpface2,
      }
    }

    if (isChromaticHarpFace(fullInteractionMatrix)) throw Error(errorMessage)

    const removeInteractionIds = [] as ReadonlyArray<InteractionIds>
    const mapForRemovalProps1 = {
      matrix: fullMatrix.harpface1,
      removeInteractionIds,
      interactionMatrix: fullInteractionMatrix.harpface1,
    }
    const withRemovedInteractions1 = mapMatrixToRemoveBySiblingInteraction(
      mapForRemovalProps1
    )
    const harpface1 = trimFullMatrixByColumnBounds(
      withRemovedInteractions1,
      columnBounds
    ).filter(isPopulatedArray)
    return {
      harpface1,
    }
  })()

  if (
    isMatchHarpFaceFacts(
      doSparceIdedObjectMatricesMatch,
      prevViewableMatrices,
      nextViewableMatrix
    )
  )
    return prevViewableMatrices
  return nextViewableMatrix
}
