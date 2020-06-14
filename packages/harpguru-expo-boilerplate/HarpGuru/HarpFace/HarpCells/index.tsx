import React from 'react'

import type { HarpRowProps } from '../HarpRow'
import { HarpCell } from '../HarpCell'
import type { YXCoord } from '../HarpCell'


export const getHarpCells = (props: HarpRowProps): React.ReactElement[] => {
  const { activeHarpStrata: { degreeMatrix }} = props
  const { yCoord } = props

  const [ matrixRow ] = degreeMatrix
  const harpCells = matrixRow.map((_, index) => {
    const yxCoord: YXCoord = [yCoord, index]
    // TODO: this has one extra props than required (the yCoords is included which is messy)
    return <HarpCell key={index} {...props} yxCoord={yxCoord} />
  })

  return harpCells
}
