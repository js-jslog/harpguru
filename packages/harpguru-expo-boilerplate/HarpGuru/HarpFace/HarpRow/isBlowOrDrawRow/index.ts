import { InteractionIds } from 'harpstrata'

import type { HarpRowProps } from '../types'

const getInteractionId = (props: HarpRowProps): InteractionIds | undefined => {
  const { yCoord, activeHarpStrata } = props
  const {
    apparatus: { interactionMatrix },
  } = activeHarpStrata
  const {
    [yCoord]: { [0]: thisInteraction },
  } = interactionMatrix
  const { id: interactionId } = thisInteraction || { id: undefined }

  return interactionId
}

export const isBlowRow = (props: HarpRowProps): boolean => {
  const interactionId = getInteractionId(props)
  const isBlow = interactionId === InteractionIds.Blow

  return isBlow
}

export const isDrawRow = (props: HarpRowProps): boolean => {
  const interactionId = getInteractionId(props)
  const isDraw = interactionId === InteractionIds.Draw

  return isDraw
}

export const isBlowOrDrawRow = (props: HarpRowProps): boolean => {
  return isBlowRow(props) || isDrawRow(props)
}
