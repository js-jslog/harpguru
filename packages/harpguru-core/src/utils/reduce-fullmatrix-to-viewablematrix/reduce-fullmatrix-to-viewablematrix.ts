import {
  isChromaticHarpFace,
  InteractionIds,
  mapHarpFaceFacts,
  HarpFaceMatrix,
} from 'harpparts'
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
  fullMatrices: HarpFaceMatrices<T>,
  fullInteractionMatrices: HarpFaceMatrices<Interaction>,
  columnBounds: ColumnBounds
): HarpFaceMatrices<T> => {
  type InteractionMatrixWithSibling = {
    interactionMatrix: HarpFaceMatrix<Interaction>
    siblingMatrix: HarpFaceMatrix<T>
  }

  const pairedMatrices = (() => {
    if (isChromaticHarpFace(fullMatrices)) {
      if (!isChromaticHarpFace(fullInteractionMatrices))
        throw Error(errorMessage)
      return {
        harpface1: {
          interactionMatrix: fullInteractionMatrices.harpface1,
          siblingMatrix: fullMatrices.harpface1,
        },
        harpface2: {
          interactionMatrix: fullInteractionMatrices.harpface2,
          siblingMatrix: fullMatrices.harpface2,
        },
      }
    }
    if (isChromaticHarpFace(fullInteractionMatrices)) throw Error(errorMessage)
    return {
      harpface1: {
        interactionMatrix: fullInteractionMatrices.harpface1,
        siblingMatrix: fullMatrices.harpface1,
      },
    }
  })()

  const removeInteractionIds = (() => {
    if (!isChromaticHarpFace(fullMatrices)) return []
    // TODO: This is rubbish. Can I not find a way to just remove the Blow & Draw
    // from the full list of InteractionIds?
    return [
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
  })()

  const mapFunction = (
    interactionMatrixWithSibling: InteractionMatrixWithSibling
  ) => {
    const {
      siblingMatrix: matrix,
      interactionMatrix,
    } = interactionMatrixWithSibling
    const withRemovedInteractions = mapMatrixToRemoveBySiblingInteraction({
      matrix,
      removeInteractionIds,
      interactionMatrix,
    })
    return trimFullMatrixByColumnBounds(
      withRemovedInteractions,
      columnBounds
    ).filter(isPopulatedArray)
  }
  const nextViewableMatrix = mapHarpFaceFacts(pairedMatrices, mapFunction)

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
