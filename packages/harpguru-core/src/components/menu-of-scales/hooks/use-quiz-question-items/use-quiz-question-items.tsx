import React from 'react'
import { getDegreeIds, getDegree } from 'harpparts'
import type { DegreeIds } from 'harpparts'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'
import { OptionBreak } from '../../../option-break'
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
      value={getDegree(id).label}
      isSelected={activeQuizDegrees.includes(id)}
      isMultiSelect={true}
      itemTapHandler={itemTapHandler}
      callbackParam={id}
      twoColumns={false}
    />
  ))

  const [, setActiveQuizDegrees] = useGlobal('activeQuizDegrees')
  const [activeDegreeIds] = useGlobal('activeDegreeIds')
  const syncWithHarpTapHandler = () => setActiveQuizDegrees(activeDegreeIds)
  const syncItem = (
    <OptionItem
      value={'Sync with active harp'}
      isSelected={false}
      itemTapHandler={syncWithHarpTapHandler}
      callbackParam={undefined}
      twoColumns={false}
    />
  )
  const clearItem = (
    <OptionItem
      value={'Clear all'}
      isSelected={false}
      itemTapHandler={() => setActiveQuizDegrees([])}
      callbackParam={undefined}
      twoColumns={false}
    />
  )
  const breakItem = <OptionBreak />
  return [syncItem, clearItem, breakItem, ...items]
}
