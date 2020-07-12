import { InteractionIds } from 'harpstrata'

import type { HarpRowProps } from '../types'

type Props = Pick<HarpRowProps, 'activeHarpStrata' | 'yCoord'>

const getInteractionId = ({
  activeHarpStrata,
  yCoord,
}: Props): InteractionIds | undefined => {
  const {
    apparatus: { interactionMatrix },
  } = activeHarpStrata
  const {
    [yCoord]: { [0]: thisInteraction },
  } = interactionMatrix
  const { id: interactionId } = thisInteraction || { id: undefined }

  return interactionId
}

export const isBlowRow = (props: Props): boolean => {
  const interactionId = getInteractionId(props)
  const isBlow = interactionId === InteractionIds.Blow

  return isBlow
}

export const isDrawRow = (props: Props): boolean => {
  const interactionId = getInteractionId(props)
  const isDraw = interactionId === InteractionIds.Draw

  return isDraw
}

export const isBlowOrDrawRow = (props: Props): boolean => {
  return isBlowRow(props) || isDrawRow(props)
}
