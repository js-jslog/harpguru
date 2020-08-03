import React from 'react'
import type { ReactElement } from 'react'

import { HoleNumber } from '../../hole-number'
import type { XRange } from '../../../types'

export const getHoleNumbers = (xRange: XRange): ReactElement[] => {
  return xRange.map((xCoord) => {
    return <HoleNumber key={xCoord} xCoord={xCoord} />
  })
}
