import type { HarpStrata } from 'harpstrata'
import { InteractionIds } from 'harpparts'

import type { Coord } from '../../../../types'

const getInteractionId = (
  yCoord: Coord,
  activeHarpStrata: HarpStrata
): InteractionIds | undefined => {
  const {
    apparatus: { interactionMatrix },
  } = activeHarpStrata
  const {
    [yCoord]: { [0]: thisInteraction },
  } = interactionMatrix
  const { id: interactionId } = thisInteraction || { id: undefined }

  return interactionId
}

export const isBlowRow = (
  yCoord: Coord,
  activeHarpStrata: HarpStrata
): boolean => {
  const interactionId = getInteractionId(yCoord, activeHarpStrata)
  const isBlow = interactionId === InteractionIds.Blow

  return isBlow
}

export const isDrawRow = (
  yCoord: Coord,
  activeHarpStrata: HarpStrata
): boolean => {
  const interactionId = getInteractionId(yCoord, activeHarpStrata)
  const isDraw = interactionId === InteractionIds.Draw

  return isDraw
}

export const isBlowOrDrawRow = (
  yCoord: Coord,
  activeHarpStrata: HarpStrata
): boolean => {
  return (
    isBlowRow(yCoord, activeHarpStrata) || isDrawRow(yCoord, activeHarpStrata)
  )
}
