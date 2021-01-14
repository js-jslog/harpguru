import type { Node } from 'react-native-reanimated'
import React from 'react'

import { OptionListTitle } from '../../../option-list-title'
import { OptionList } from '../../../option-list'
import type { Item } from '../../../option-list'

export function getOptionListComponents<T>(
  titles: ReadonlyArray<string>,
  itemsz: ReadonlyArray<ReadonlyArray<Item<T>>>,
  transitionValue: Node<number>,
  tapHandler: (arg0: T) => void
): [ReadonlyArray<React.ReactElement>, ReadonlyArray<React.ReactElement>] {
  const optionListTitleComponents = titles.map((title, index, array) => {
    return (
      <OptionListTitle
        title={title}
        animatedValue={transitionValue}
        selfIndex={index}
        totalItems={array.length}
        key={index}
      />
    )
  })

  const optionListComponents = itemsz.map((items, index, array) => {
    return (
      <OptionList
        items={items}
        animatedValue={transitionValue}
        selfIndex={index}
        totalItems={array.length}
        tapHandler={tapHandler}
        key={index}
      />
    )
  })

  return [optionListTitleComponents, optionListComponents]
}
