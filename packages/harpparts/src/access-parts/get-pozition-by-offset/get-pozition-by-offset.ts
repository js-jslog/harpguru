import { getPozition, getPozitionIds } from '../index'
import type { HalfstepIndex } from '../../types'
import type { Pozition, PozitionIds } from '../../pozition'

export const getPozitionByOffset = (rootOffset: HalfstepIndex): Pozition => {
  const pozitions = getPozitionIds().map((pozitionId: PozitionIds) =>
    getPozition(pozitionId)
  )
  const reducer = (
    accumulator: PozitionIds | undefined,
    nextPozition: Pozition
  ): PozitionIds | undefined => {
    if (rootOffset === nextPozition.rootOffset) return nextPozition.id
    return accumulator
  }

  const pozitionId = pozitions.reduce(reducer, undefined)

  if (pozitionId !== undefined) return getPozition(pozitionId)

  const errorMessage = `
    A Pozition instance has not been found to contain
    the input rootOffset: ${rootOffset}
    The rootOffset is any number up to 11.
    If your number is over 11 then try performing mod 12 on it.
  `
  throw new Error(errorMessage)
}
