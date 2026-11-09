import './global'
import '../typings/polyfills.d'

import type { ReactElement } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

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

export type Setup = {
  readonly harpStrataProps: HarpStrataProps & {
    readonly activeIds: ReadonlyArray<DegreeIds>
  }
  readonly displayMode: DisplayModes
}

export const siteOrigin: string
export const defaultSetup: Setup
export const readSetupQuery: (query: string) => Setup
export const writeSetupQuery: (setup: Setup) => string
export const writeSetupUrl: (
  setup: Setup,
  options?: { readonly openInBrowser?: boolean }
) => string
export const readSetupUrl: (url: string) => Setup | undefined
