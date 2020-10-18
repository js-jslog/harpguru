import { useGlobal } from 'reactn'
import React from 'react'

import { HarpCellWrapper } from '../../../harp-cell-wrapper'
import type { YXCoord } from '../../../harp-cell'
import type { Coord, XRange } from '../../../../types'

export const getHarpCells = (
  yCoord: Coord,
  xRange: XRange
): React.ReactElement[] => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const harpCells = xRange.map((xCoord) => {
    const yxCoord: YXCoord = [yCoord, xCoord]
    const props = {
      yxCoord,
      activeHarpStrata,
      setActiveHarpStrata,
      activeDisplayMode,
      activeExperienceMode,
    }

    return <HarpCellWrapper key={xCoord} {...props} />
  })

  return harpCells
}
