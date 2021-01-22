import { getScale, getScaleIds, ScaleCategory } from 'harpparts'
import type { DegreeIds } from 'harpparts'

import type { OptionStackProps } from '../../../../types'

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
  const titles = [scales, chords].map((list) =>
    list[0].category === ScaleCategory.Scale ? 'Scales' : 'Chords'
  )
  const itemsz = [scales, chords].map((list) => [
    {
      label: 'Clear all',
      callbackParam: [],
    },
    ...list.map((item) => ({
      label: item.label,
      callbackParam: item.degrees,
    })),
  ])

  const optionPropsz = [
    {
      title: titles[0],
      useSubTitle,
      items: itemsz[0],
      twoColumns: false,
      itemTapHandler,
    },
    {
      title: titles[1],
      useSubTitle,
      items: itemsz[1],
      twoColumns: false,
      itemTapHandler,
    },
  ]

  return { optionPropsz }
}
