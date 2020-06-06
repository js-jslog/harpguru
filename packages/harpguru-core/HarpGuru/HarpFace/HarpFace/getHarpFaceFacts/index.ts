import type { HarpFaceProps, HarpFaceFacts } from '../types'

export const getHarpFaceFacts = (props: HarpFaceProps): HarpFaceFacts  => {
  const { activeHarpStrata: { degreeMatrix } } = props

  const { length: rowCount } = degreeMatrix
  const { [0]: { length: columnCount }} = degreeMatrix

  return { columnCount, rowCount }
}
