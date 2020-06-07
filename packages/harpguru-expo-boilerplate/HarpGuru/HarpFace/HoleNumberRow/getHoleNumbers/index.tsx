import React from 'react'
import type { ReactElement } from 'react'
import type { Degree } from 'harpstrata'

import type { HarpFaceProps } from '../../types'
import { HoleNumber } from '../../HoleNumber'
import type { HoleNumberProps } from '../../HoleNumber'


export const getHoleNumbers = (harpFaceProps: HarpFaceProps): ReactElement[] => {
  const { activeHarpStrata } = harpFaceProps
  const { degreeMatrix } = activeHarpStrata
  const [ degreeRow ] = degreeMatrix

  return degreeRow.map((degree: Degree | undefined, index: number) => {
    const xCoord = index
    const holeNumberProps: HoleNumberProps = { xCoord }

    return <HoleNumber key={index} { ...holeNumberProps } />
  })
}
