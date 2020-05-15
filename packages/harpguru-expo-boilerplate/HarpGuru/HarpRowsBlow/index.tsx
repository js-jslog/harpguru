import React from 'react'
import type { ReactElement } from 'react'
import { InteractionIds } from 'harpstrata'

import { HarpRow } from '../HarpRow'
import type { HarpFaceProps } from '../HarpFace'

import { mapRowToBlowDrawIds } from './mapRowToBlowDrawIds'

export const HoleRowsBlow = (props: HarpFaceProps): ReactElement[] => {
  const { harpStrata: { apparatus: { interactionMatrix }}} = props
  const blowDrawIdsMap = interactionMatrix.map(mapRowToBlowDrawIds)

  const drawIndex = blowDrawIdsMap.indexOf(InteractionIds.Draw)
  const blowRowsPrimer = blowDrawIdsMap.slice(0, drawIndex)

  const holeRowsBlow = blowRowsPrimer.map((redundantValue, index) => {
    return <HarpRow key={index} {...props} yCoord={index} />
  })

  return holeRowsBlow
}
