import React from 'react'

import { Coord } from '../HarpRow'
import type { HarpFaceProps } from '../HarpFace'
import { HarpCell } from '../HarpCell'
import type { YXCoord } from '../HarpCell'


export const getHarpCells = (props: HarpFaceProps, yCoord: Coord): React.ReactElement[] => {
  const { harpStrata: { degreeMatrix }} = props

  const [ matrixRow ] = degreeMatrix
  const harpCells = matrixRow.map((redundantValue, index) => {
    const yxCoord: YXCoord = [yCoord, index]
    return <HarpCell key={index} {...props} yxCoord={yxCoord} />
  })

  return harpCells
}
