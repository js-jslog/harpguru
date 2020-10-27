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

const getRemainder = (
  orderedOptionIds: ReadonlyArray<OptionIds>
): [OptionIds | undefined, OptionIds | undefined] => {
  const { length } = orderedOptionIds
  if (length <= 4) {
    return [undefined, undefined]
  } else if (length === 5) {
    return [undefined, orderedOptionIds[length - 1]]
  } else {
    return [orderedOptionIds[length - 2], orderedOptionIds[length - 1]]
  }
}

export const setOptionsInListOfSix = (
  orderedOptionIds: ReadonlyArray<OptionIds>,
  activeOptionId: OptionIds
): OptionDisplayList => {
  const activeFirstOrderedIds = putActiveOptionFirst(
    orderedOptionIds,
    activeOptionId
  )

  const arrayToFill = [0, 0, 0, 0]
  const returnArray = arrayToFill.map((_, index) => {
    if (activeFirstOrderedIds[index]) return activeFirstOrderedIds[index]
    return undefined
  })

  return [
    ...getRemainder(orderedOptionIds),
    ...returnArray,
  ] as OptionDisplayList
}
