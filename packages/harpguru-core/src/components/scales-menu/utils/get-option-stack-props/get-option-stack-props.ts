import { useGlobal } from 'reactn'
import { useCallback } from 'react'
import {
  getScale,
  getScaleByDegreeIds,
  getScaleIds,
  ScaleCategory,
} from 'harpparts'
import type { DegreeIds } from 'harpparts'

import {
  OptionProps_Scales,
  OptionStackProps,
  OptionTypes,
} from '../../../../types'

export const getOptionStackProps = (
  useSubTitle: () => string,
  itemTapHandler: (arg0: ReadonlyArray<DegreeIds>) => void
): OptionStackProps => {
  const scales = getScaleIds()
    .map((id) => getScale(id))
    .filter((scale) => scale.category === ScaleCategory.Scale)
  const chords = getScaleIds()
    .map((id) => getScale(id))
    .filter((scale) => scale.category === ScaleCategory.Chord)
  const useScaleItems = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: activeScaleId } = getScaleByDegreeIds(activeDegreeIds) || {
      id: '',
    }
    return [
      {
        label: 'Clear all',
        isSelected: false,
        callbackParam: [],
      },
      ...scales.map((item) => ({
        label: item.label,
        isSelected: item.label === activeScaleId,
        callbackParam: item.degrees,
      })),
    ]
  }, [useGlobal, scales])
  const useChordItems = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: activeScaleId } = getScaleByDegreeIds(activeDegreeIds) || {
      id: '',
    }
    return [
      {
        label: 'Clear all',
        isSelected: false,
        callbackParam: [],
      },
      ...chords.map((item) => ({
        label: item.label,
        isSelected: item.label === activeScaleId,
        callbackParam: item.degrees,
      })),
    ]
  }, [useGlobal, chords])
  const titles = [scales, chords].map((list) =>
    list[0].category === ScaleCategory.Scale ? 'Scales' : 'Chords'
  )

  const optionPropsz: ReadonlyArray<OptionProps_Scales> = [
    {
      title: titles[0],
      useSubTitle,
      optionType: OptionTypes.Scales,
      useItems: useScaleItems,
      twoColumns: false,
      itemTapHandler,
    },
    {
      title: titles[1],
      useSubTitle,
      optionType: OptionTypes.Scales,
      useItems: useChordItems,
      twoColumns: false,
      itemTapHandler,
    },
  ]

  return { optionPropsz }
}
