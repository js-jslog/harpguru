import { useGlobal } from 'reactn'
import React, { ReactElement } from 'react'
import { InteractionIds } from 'harpparts'

import { useViewableMatrices } from '../use-viewable-matrices'
import { mapRowToBlowDrawIds } from '../map-row-to-blow-draw-ids'
import { HarpRow } from '../../../harp-row'
import type { XRange } from '../../../../types'

type HarpRows = {
  readonly top: ReactElement[]
  readonly bottom: ReactElement[]
}

export const useHarpRows = (xRange: XRange): HarpRows => {
  const { viewableInteractionMatrix } = useViewableMatrices()
  const viewableBlowDrawIdsMap = viewableInteractionMatrix.map(
    mapRowToBlowDrawIds
  )

  const drawIndex = viewableBlowDrawIdsMap.indexOf(InteractionIds.Draw)
  const topRowsPrimer = viewableBlowDrawIdsMap.slice(0, drawIndex)
  const bottomRowsPrimer = viewableBlowDrawIdsMap.slice(drawIndex)

  // TODO: this is a bit clumsy. There are 2 options here:
  // 1. decide this is an elegant approach but a messy implementation - refactor
  // 2. decide that all of the objects further down the chain should be using the viewable matrices too - refactor
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const {
    apparatus: { interactionMatrix: fullInteractionMatrix },
  } = activeHarpStrata
  const fullBlowDrawIdsMap = fullInteractionMatrix.map(mapRowToBlowDrawIds)
  const fullDrawIndex = fullBlowDrawIdsMap.indexOf(InteractionIds.Draw)
  const drawIndexDiff = fullDrawIndex - drawIndex

  const topHarpRows = topRowsPrimer.map((_, index) => {
    return (
      <HarpRow key={index} xRange={xRange} yCoord={index + drawIndexDiff} />
    )
  })
  const bottomHarpRows = bottomRowsPrimer.map((_, index) => {
    const amendedIndex = index + topHarpRows.length + drawIndexDiff
    return <HarpRow key={amendedIndex} xRange={xRange} yCoord={amendedIndex} />
  })

  const harpRows = {
    top: topHarpRows,
    bottom: bottomHarpRows,
  }

  return harpRows
}
