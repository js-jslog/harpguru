export enum IsActiveIds {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export type IsActiveRow = ReadonlyArray<IsActiveIds | undefined>
export type IsActiveMatrix = ReadonlyArray<IsActiveRow>
