import React from 'react'
import type { ReactElement } from 'react'

import type { HoleNumberRowProps } from '../types'
import { HoleNumber } from '../../HoleNumber'
import type { HoleNumberProps } from '../../HoleNumber'

export const getHoleNumbers = ({
  xRange,
}: HoleNumberRowProps): ReactElement[] => {
  return xRange.map((xCoord) => {
    const holeNumberProps: HoleNumberProps = { xCoord }

    return <HoleNumber key={xCoord} {...holeNumberProps} />
  })
}
