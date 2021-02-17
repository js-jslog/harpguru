import React from 'react'
import { getDegreeIds, getDegree } from 'harpparts'
import type { DegreeIds } from 'harpparts'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import type { UseGlobal } from '../../../../types'

type ItemCallback = DegreeIds
type ItemTapHandler = (arg0: DegreeIds) => void

type ReturnType = ReadonlyArray<
  React.ReactElement<OptionItemProps<ItemCallback>>
>

export const useQuizQuestionItems = (
  useGlobal: UseGlobal,
  itemTapHandler: ItemTapHandler
): ReturnType => {
  const [activeQuizDegrees] = useGlobal('activeQuizDegrees')
  const items = getDegreeIds().map((id, index) => (
    <OptionItem
      key={`${index}`}
      value={getDegree(id)}
      isSelected={activeQuizDegrees.includes(id)}
      itemTapHandler={itemTapHandler}
      callbackParam={id}
      twoColumns={false}
    />
  ))
  return items
}
