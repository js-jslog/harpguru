import React from 'react'
import type { ReactElement } from 'react'

import { GenericButton, UpdateCategories } from '../../GenericButton'
import type {
  PozitionButtonProps,
  PozitionButtonGenericProps,
} from '../../GenericButton'

export function PozitionButton(props: PozitionButtonProps): ReactElement {
  const { Pozition: updateCategory } = UpdateCategories
  const { setActiveHarpStrata, activeHarpStrata, id } = props
  const genericProps: PozitionButtonGenericProps = {
    setActiveHarpStrata,
    activeHarpStrata,
    id,
    updateCategory,
  }
  return <GenericButton {...genericProps} />
}
