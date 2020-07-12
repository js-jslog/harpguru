import type { FragmentFacts, HarpFaceFragmentProps } from '../types'

export const getFragmentFacts = ({
  xRange,
}: HarpFaceFragmentProps): FragmentFacts => {
  return { columnCount: xRange.length }
}
