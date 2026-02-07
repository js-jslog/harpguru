import React from 'react'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import { getZoomText } from '../../utils'
import { OptionItemWithDegreeMatrix } from '../../../option-item-with-degree-matrix'
import type { OptionItemWithDegreeMatrixProps } from '../../../option-item-with-degree-matrix'
import { determineZoomId } from '../../../../utils'
import { ZoomIds } from '../../../../types'
import { useHarpGuruStore } from '../../../../store'

type ItemCallback = ZoomIds
type ItemTapHandler = (arg0: HarpFaceMatrix<Degree>, arg1: ZoomIds) => void

type ValvingItems = ReadonlyArray<
  React.ReactElement<OptionItemWithDegreeMatrixProps<ItemCallback>>
>

export const useZoomItems = (itemTapHandler: ItemTapHandler): ValvingItems => {
  const columnBounds = useHarpGuruStore((state) => state.columnBounds)
  const activeDegreeMatrix = useHarpGuruStore(
    (state) => state.activeDegreeMatrix
  )
  const activeZoomId = determineZoomId(columnBounds)
  const zoomIds = [ZoomIds.Fit, ZoomIds.Seven, ZoomIds.Ten, ZoomIds.Twelve]
  const items = zoomIds.map((id, index) => (
    <OptionItemWithDegreeMatrix
      key={`${index}`}
      value={getZoomText(id)}
      isSelected={id === activeZoomId}
      itemTapHandler={itemTapHandler}
      // TODO: This really doesn't need to be either of the
      // degree matrices, it could just be a layout fact..
      degreeMatrix={activeDegreeMatrix.harpface1}
      callbackParam={id}
      twoColumns={false}
    />
  ))
  return items
}
