import { useGlobal } from 'reactn'
import React, { useCallback } from 'react'
import {
  getScale,
  getScaleByDegreeIds,
  getScaleIds,
  ScaleCategory,
} from 'harpparts'
import type { DegreeIds } from 'harpparts'

import type { OptionStackProps } from '../../../option-stack'
import { OptionItem } from '../../../option-item'

// TODO: It's a bit confusing having a getter util which
// needs to have a .tsx extension. Is there any way to
// resolve that?
export const getOptionStackProps = (
  useScalesTitle: () => React.ReactElement,
  useChordsTitle: () => React.ReactElement,
  itemTapHandler: (arg0: ReadonlyArray<DegreeIds>) => void
): OptionStackProps => {
  const useScaleItems = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: activeScaleId } = getScaleByDegreeIds(activeDegreeIds) || {
      id: '',
    }
    const scales = getScaleIds()
      .map((id) => getScale(id))
      .filter((scale) => scale.category === ScaleCategory.Scale)
    return [
      <OptionItem
        key={'clear-all-scales'}
        value={'Clear all'}
        isSelected={false}
        itemTapHandler={itemTapHandler}
        callbackParam={[]}
        twoColumns={false}
      />,
      ...scales.map((item, index) => (
        <OptionItem
          key={`${index}`}
          value={item.label}
          isSelected={item.label === activeScaleId}
          itemTapHandler={itemTapHandler}
          callbackParam={item.degrees}
          twoColumns={false}
        />
      )),
    ]
  }, [useGlobal])
  const useChordItems = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { activeDegreeIds } = activeHarpStrata
    const { label: activeScaleId } = getScaleByDegreeIds(activeDegreeIds) || {
      id: '',
    }
    const chords = getScaleIds()
      .map((id) => getScale(id))
      .filter((scale) => scale.category === ScaleCategory.Chord)
    return [
      <OptionItem
        key={'clear-all-chords'}
        value={'Clear all'}
        isSelected={false}
        itemTapHandler={itemTapHandler}
        callbackParam={[]}
        twoColumns={false}
      />,
      ...chords.map((item, index) => (
        <OptionItem
          key={`${index}`}
          value={item.label}
          isSelected={item.label === activeScaleId}
          itemTapHandler={itemTapHandler}
          callbackParam={item.degrees}
          twoColumns={false}
        />
      )),
    ]
  }, [useGlobal])

  const optionPropsz = [
    {
      useTitle: useScalesTitle,
      useItems: useScaleItems,
      twoColumns: false,
    },
    {
      useTitle: useChordsTitle,
      useItems: useChordItems,
      twoColumns: false,
    },
  ]

  return { optionPropsz }
}
