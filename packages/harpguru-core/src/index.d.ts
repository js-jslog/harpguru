import './global'
import '../typings/polyfills.d'

import type { ReactElement } from 'react'
import type { HarpStrataProps } from 'harpstrata'

export const HarpGuru: () => ReactElement

export declare enum DisplayModes {
  Degree = 'Degree',
  Pitch = 'Pitch',
}

export type StandaloneHarpFaceProps = {
  readonly harpStrataProps: HarpStrataProps
  readonly displayMode: DisplayModes
  readonly isInteractive: boolean
}

export const StandaloneHarpFace: (
  props: StandaloneHarpFaceProps
) => ReactElement
