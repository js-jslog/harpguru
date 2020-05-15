import React from 'react'
import { InteractionIds } from 'harpstrata'

import { HarpRows } from '../types'
import { mapRowToBlowDrawIds } from '../mapRowToBlowDrawIds'
import { HarpRow } from '../../HarpRow'
import type { HarpFaceProps } from '../../HarpFace'


export const getHarpRows = (props: HarpFaceProps): HarpRows => {
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

  const harpRows = {
    top: topHarpRows,
    bottom: bottomHarpRows,
  }

  return harpRows
}
