export type IdedObject = {
  id: unknown
}

export type SparceIdedObjectRow = ReadonlyArray<IdedObject | undefined>
export type SparceIdedObjectMatrix = ReadonlyArray<SparceIdedObjectRow>
