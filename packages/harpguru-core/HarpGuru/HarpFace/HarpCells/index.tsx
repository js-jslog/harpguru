import React from 'react'

import type { HarpRowProps } from '../HarpRow'
import { HarpCell } from '../HarpCell'
import type { YXCoord } from '../HarpCell'

export const getHarpCells = (props: HarpRowProps): React.ReactElement[] => {
  const { yCoord, ...harpCellPropsPart } = props
  const { xRange } = harpCellPropsPart

  const harpCells = xRange.map((xCoord) => {
    const yxCoord: YXCoord = [yCoord, xCoord]
    return <HarpCell key={xCoord} {...harpCellPropsPart} yxCoord={yxCoord} />
  })

  return harpCells
}
