import { PozitionIds } from '../types'
import type { Pozition } from '../types'
import { HarpPartTypes } from '../../types'

export const FIRST: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.First,
  rootOffset: 0,
  simpleSplitValue: ['1', 'st'],
}
export const EIGHTH: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Eighth,
  rootOffset: 1,
  simpleSplitValue: ['8', 'th'],
}
export const THIRD: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Third,
  rootOffset: 2,
  simpleSplitValue: ['3', 'rd'],
}
export const TENTH: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Tenth,
  rootOffset: 3,
  simpleSplitValue: ['10', 'th'],
}
export const FIFTH: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Fifth,
  rootOffset: 4,
  simpleSplitValue: ['5', 'th'],
}
export const TWELFTH: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Twelfth,
  rootOffset: 5,
  simpleSplitValue: ['12', 'th'],
}
export const SEVENTH: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Seventh,
  rootOffset: 6,
  simpleSplitValue: ['7', 'th'],
}
export const SECOND: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Second,
  rootOffset: 7,
  simpleSplitValue: ['2', 'nd'],
}
export const NINTH: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Ninth,
  rootOffset: 8,
  simpleSplitValue: ['9', 'th'],
}
export const FOURTH: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Fourth,
  rootOffset: 9,
  simpleSplitValue: ['4', 'th'],
}
export const ELEVENTH: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Eleventh,
  rootOffset: 10,
  simpleSplitValue: ['11', 'th'],
}
export const SIXTH: Pozition = {
  type: HarpPartTypes.Pozition,
  id: PozitionIds.Sixth,
  rootOffset: 11,
  simpleSplitValue: ['6', 'th'],
}
