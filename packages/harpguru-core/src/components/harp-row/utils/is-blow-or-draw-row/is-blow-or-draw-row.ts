import type { HarpFaceMatrix, Interaction } from 'harpparts'
import { InteractionIds } from 'harpparts'

import type { Coord } from '../../../../types'

const getInteractionId = (
  yCoord: Coord,
  interactionMatrix: HarpFaceMatrix<Interaction>
): InteractionIds | undefined => {
  const {
    [yCoord]: { [0]: thisInteraction },
  } = interactionMatrix
  const { id: interactionId } = thisInteraction || { id: undefined }

  return interactionId
}

export const isBlowRow = (
  yCoord: Coord,
  interactionMatrix: HarpFaceMatrix<Interaction>
): boolean => {
  const interactionId = getInteractionId(yCoord, interactionMatrix)
  const isBlow = interactionId === InteractionIds.Blow

  return isBlow
}

export const isDrawRow = (
  yCoord: Coord,
  interactionMatrix: HarpFaceMatrix<Interaction>
): boolean => {
  const interactionId = getInteractionId(yCoord, interactionMatrix)
  const isDraw = interactionId === InteractionIds.Draw

  return isDraw
}

export const isBlowOrDrawRow = (
  yCoord: Coord,
  interactionMatrix: HarpFaceMatrix<Interaction>
): boolean => {
  return (
    isBlowRow(yCoord, interactionMatrix) || isDrawRow(yCoord, interactionMatrix)
  )
}
