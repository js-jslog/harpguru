import type { Degree, Pitch, Interaction, IsActiveIds } from 'harpstrata'

import type { HarpCellProps } from '../types'

export type PositionFacts = {
  readonly thisDegree: Degree | undefined;
  readonly thisPitch: Pitch | undefined;
  readonly thisInteraction: Interaction | undefined;
  readonly thisIsActive: IsActiveIds | undefined;
  readonly leftmost: boolean;
}

export const analysePosition = (props: HarpCellProps): PositionFacts => {
  const { harpStrata: { degreeMatrix, pitchMatrix, isActiveComplex: { isActiveMatrix }}} = props
  const { harpStrata: { apparatus: {interactionMatrix}}} = props
  const { yxCoord: [ yCoord, xCoord ]} = props
  const { [yCoord]: {[xCoord]: thisDegree} } = degreeMatrix
  const { [yCoord]: {[xCoord]: thisPitch} } = pitchMatrix
  const { [yCoord]: {[xCoord]: thisInteraction} } = interactionMatrix
  const { [yCoord]: {[xCoord]: thisIsActive} } = isActiveMatrix
  const leftmost = (xCoord === 0)
  return {
    thisDegree,
    thisPitch,
    thisInteraction,
    thisIsActive,
    leftmost
  }
}
