import { PozitionIds } from '../types'
import type { Pozition } from '../types'
import { POZITION_INSTANCES } from '../instances'
import type { HalfstepIndex } from '../../Apparatus'


export const getPozition = (pozitionId: PozitionIds): Pozition => {
  const { [pozitionId]: pozition } = POZITION_INSTANCES

  return pozition
}

export const getPozitionByOffset = (rootOffset: HalfstepIndex): Pozition => {
  const pozitions = Object.values(POZITION_INSTANCES)
  const reducer = (accumulator: PozitionIds | undefined, nextPozition: Pozition): PozitionIds | undefined => {
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
