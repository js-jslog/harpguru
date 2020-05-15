import React from 'react'
import type { ReactElement } from 'react'
import { InteractionIds } from 'harpstrata'

import { HarpRow } from '../HarpRow'
import type { HarpFaceProps } from '../HarpFace'

import { mapRowToBlowDrawIds } from './mapRowToBlowDrawIds'

type HarpRows = {
  readonly top: ReactElement[];
  readonly bottom: ReactElement[];
}

export const HarpRows = (props: HarpFaceProps): HarpRows => {
  const { harpStrata: { apparatus: { interactionMatrix }}} = props
  const blowDrawIdsMap = interactionMatrix.map(mapRowToBlowDrawIds)

  const drawIndex = blowDrawIdsMap.indexOf(InteractionIds.Draw)
  const topRowsPrimer = blowDrawIdsMap.slice(0, drawIndex)
  const bottomRowsPrimer = blowDrawIdsMap.slice(drawIndex)

  const topHarpRows = topRowsPrimer.map((redundantValue, index) => {
    return <HarpRow key={index} {...props} yCoord={index} />
  })
  const bottomHarpRows = bottomRowsPrimer.map((redundantValue, index) => {
    const amendedIndex = index + topHarpRows.length
    return <HarpRow key={amendedIndex} {...props} yCoord={amendedIndex} />
  })

  const HarpRows = {
    top: topHarpRows,
    bottom: bottomHarpRows,
  }

  return HarpRows
}
