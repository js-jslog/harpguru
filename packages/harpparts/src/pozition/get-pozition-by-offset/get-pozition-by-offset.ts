import type { Pozition, PozitionIds } from '../types'
import { getPozition } from '../get-pozition'
import { POZITION_INSTANCES } from '../constants'
import type { HalfstepIndex } from '../../types'

export const getPozitionByOffset = (rootOffset: HalfstepIndex): Pozition => {
  const pozitions = Object.values(POZITION_INSTANCES)
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
