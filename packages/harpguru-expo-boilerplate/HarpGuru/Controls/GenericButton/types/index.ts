import type { PitchIds, PozitionIds } from 'harpstrata'

import type { HarpStrataControlProps } from '../../types'

export type PozitionButtonProps = HarpStrataControlProps & {
  readonly id: PozitionIds;
}

export type HarpKeyButtonProps = HarpStrataControlProps & {
  readonly id: PitchIds;
}

export type PozitionButtonGenericProps = PozitionButtonProps & {
  readonly updateCategory: UpdateCategories.Pozition;
}
export type HarpKeyButtonGenericProps = HarpKeyButtonProps & {
  readonly updateCategory: UpdateCategories.HarpKey;
}

export type GenericButtonProps = PozitionButtonGenericProps | HarpKeyButtonGenericProps

export enum UpdateCategories {
  Pozition = 'POZITION',
  HarpKey = 'HARP_KEY',
}
