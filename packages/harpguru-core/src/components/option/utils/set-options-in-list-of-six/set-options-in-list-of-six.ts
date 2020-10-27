import { putActiveOptionFirst } from '../put-active-option-first'
import { OptionIds } from '../../../../types'

type OptionDisplayList = [
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined
]
export const setOptionsInListOfSix = (
  orderedOptionIds: ReadonlyArray<OptionIds>,
  activeOptionId: OptionIds
): OptionDisplayList => {
  const activeFirstOrderedIds = putActiveOptionFirst(
    orderedOptionIds,
    activeOptionId
  )

  const arrayToFill = [0, 0, 0, 0, 0, 0]
  const returnArray = arrayToFill.map((_, index) => {
    if (activeFirstOrderedIds[index]) return activeFirstOrderedIds[index]
    return undefined
  })

  const { length } = orderedOptionIds
  if (length === 5) {
    return [
      undefined,
      ...returnArray.slice(4, length),
      ...returnArray.slice(0, 4),
    ] as OptionDisplayList
  }

  return [
    ...returnArray.slice(4),
    ...returnArray.slice(0, 4),
  ] as OptionDisplayList
}
