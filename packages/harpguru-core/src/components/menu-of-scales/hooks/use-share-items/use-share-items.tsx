import React from 'react'

import { OptionItem } from '../../../option-item'
import type { OptionItemProps } from '../../../option-item'

type ShareItems = ReadonlyArray<React.ReactElement<OptionItemProps<undefined>>>

// The share page sits after the scales and the quiz questions, until the
// menus have a better home for it
export const useShareItems = (shareTapHandler: () => void): ShareItems => [
  <OptionItem
    key={'share-this-harp-face'}
    value={'Link and QR code'}
    isSelected={false}
    itemTapHandler={shareTapHandler}
    callbackParam={undefined}
    twoColumns={false}
  />,
]
