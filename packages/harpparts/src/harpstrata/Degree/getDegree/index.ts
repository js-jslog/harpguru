import { DegreeIds } from '../types'
import type { Degree } from '../types'

export const getDegree = (degreeId: DegreeIds): Degree => ({ id: degreeId })
