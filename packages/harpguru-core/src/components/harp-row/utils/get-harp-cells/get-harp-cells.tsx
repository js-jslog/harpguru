import React from 'react'

import { HarpCell } from '../../../harp-cell'
import type { YXCoord } from '../../../harp-cell'
import type { Coord, XRange } from '../../../../types'

export const getHarpCells = (
  yCoord: Coord,
  xRange: XRange
): React.ReactElement[] => {
  const harpCells = xRange.map((xCoord) => {
    const yxCoord: YXCoord = [yCoord, xCoord]

    return <HarpCell key={xCoord} yxCoord={yxCoord} />
  })

  return harpCells
}
