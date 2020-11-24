import { DegreeIds } from '../types'
import type { Degree } from '../types'

import { getDegree } from './get-degree'

test('getDegree function can return a root degree', () => {
  const ROOT_DEGREE: Degree = { id: DegreeIds.Root } as const
  const actualDegree = getDegree(ROOT_DEGREE.id)

  expect(actualDegree).toStrictEqual(ROOT_DEGREE)
})
