import React from 'react'

import { HarpCellWrapper } from '../../../harp-cell-wrapper'
import type { YXCoord } from '../../../harp-cell'
import type { Coord, XRange } from '../../../../types'

export const getHarpCells = (
  yCoord: Coord,
  xRange: XRange
): React.ReactElement[] => {
  const harpCells = xRange.map((xCoord) => {
    const yxCoord: YXCoord = [yCoord, xCoord]
    return <HarpCellWrapper key={xCoord} yxCoord={yxCoord} />
  })

  return harpCells
}
