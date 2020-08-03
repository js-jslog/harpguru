import type { XRange } from '../../../../types'

type FragmentFacts = {
  readonly columnCount: number
}

export const getFragmentFacts = (xRange: XRange): FragmentFacts => {
  return { columnCount: xRange.length }
}
