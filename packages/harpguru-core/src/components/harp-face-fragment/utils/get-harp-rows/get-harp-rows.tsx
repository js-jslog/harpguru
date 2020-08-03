import React, { ReactElement } from 'react'
import { InteractionIds } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'

import { mapRowToBlowDrawIds } from '../map-row-to-blow-draw-ids'
import { HarpRow } from '../../../harp-row'
import type { XRange } from '../../../../types'

type HarpRows = {
  readonly top: ReactElement[]
  readonly bottom: ReactElement[]
}

export const getHarpRows = (
  xRange: XRange,
  activeHarpStrata: HarpStrata
): HarpRows => {
  const {
    apparatus: { interactionMatrix },
  } = activeHarpStrata
  const blowDrawIdsMap = interactionMatrix.map(mapRowToBlowDrawIds)

  const drawIndex = blowDrawIdsMap.indexOf(InteractionIds.Draw)
  const topRowsPrimer = blowDrawIdsMap.slice(0, drawIndex)
  const bottomRowsPrimer = blowDrawIdsMap.slice(drawIndex)

  const topHarpRows = topRowsPrimer.map((_, index) => {
    return <HarpRow key={index} xRange={xRange} yCoord={index} />
  })
  const bottomHarpRows = bottomRowsPrimer.map((_, index) => {
    const amendedIndex = index + topHarpRows.length
    return <HarpRow key={amendedIndex} xRange={xRange} yCoord={amendedIndex} />
  })

  const harpRows = {
    top: topHarpRows,
    bottom: bottomHarpRows,
  }

  return harpRows
}
