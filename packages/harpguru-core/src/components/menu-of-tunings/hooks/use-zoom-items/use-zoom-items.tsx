import React from 'react'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import { getZoomText } from '../../utils'
import { OptionItemWithDegreeMatrix } from '../../../option-item-with-degree-matrix'
import type { OptionItemWithDegreeMatrixProps } from '../../../option-item-with-degree-matrix'
import { determineZoomId } from '../../../../utils'
import { ZoomIds } from '../../../../types'
import type { UseGlobal } from '../../../../types'

type ItemCallback = ZoomIds
type ItemTapHandler = (arg0: HarpFaceMatrix<Degree>, arg1: ZoomIds) => void

type ValvingItems = ReadonlyArray<
  React.ReactElement<OptionItemWithDegreeMatrixProps<ItemCallback>>
>

export const useZoomItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): ValvingItems => {
  // TOOMANYRENDERS: Perhaps if we had a zoomid global state which were always
  // deduced whenever the columnBounds were updated we wouldn't have to
  // update these labels when the column bounds are changed but only if they
  // have atually changed length. This will be relevant when the widget to
  // shift left and right while zoomed have been added.
  const [columnBounds] = useGlobal('columnBounds')
  const [activeDegreeMatrix] = useGlobal('activeDegreeMatrix')
  const activeZoomId = determineZoomId(columnBounds)
  const zoomIds = [ZoomIds.Fit, ZoomIds.Seven, ZoomIds.Ten, ZoomIds.Twelve]
  const items = zoomIds.map((id, index) => (
    <OptionItemWithDegreeMatrix
      key={`${index}`}
      value={getZoomText(id)}
      isSelected={id === activeZoomId}
      itemTapHandler={itemTapHandler}
      degreeMatrix={activeDegreeMatrix}
      callbackParam={id}
      twoColumns={false}
    />
  ))
  return items
}
