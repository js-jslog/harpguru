import type {
  Degree,
  Pitch,
  Interaction,
  IsActiveIds,
  HarpStrata,
} from 'harpstrata'

import type { HarpCellProps } from '../types'

export type PositionFacts = {
  readonly thisDegree: Degree | undefined
  readonly thisPitch: Pitch | undefined
  readonly thisInteraction: Interaction | undefined
  readonly thisIsActive: IsActiveIds | undefined
  readonly leftmost: boolean
}

type Props = HarpCellProps & {
  readonly activeHarpStrata: HarpStrata
}

export const analysePosition = (props: Props): PositionFacts => {
  const {
    activeHarpStrata: {
      degreeMatrix,
      pitchMatrix,
      isActiveComplex: { isActiveMatrix },
    },
  } = props
  const {
    activeHarpStrata: {
      apparatus: { interactionMatrix },
    },
  } = props
  const {
    yxCoord: [yCoord, xCoord],
  } = props
  const {
    [yCoord]: { [xCoord]: thisDegree },
  } = degreeMatrix
  const {
    [yCoord]: { [xCoord]: thisPitch },
  } = pitchMatrix
  const {
    [yCoord]: { [xCoord]: thisInteraction },
  } = interactionMatrix
  const {
    [yCoord]: { [xCoord]: thisIsActive },
  } = isActiveMatrix
  const leftmost = xCoord === 0
  return {
    thisDegree,
    thisPitch,
    thisInteraction,
    thisIsActive,
    leftmost,
  }
}
