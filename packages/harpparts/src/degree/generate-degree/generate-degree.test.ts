import { DegreeIds } from '../types'
import type { Degree } from '../types'

import { generateDegree } from './generate-degree'

test('getDegree function can return a root degree', () => {
  const ROOT_DEGREE: Degree = {
    id: DegreeIds.Root,
    label: 'Root',
  } as const
  const actualDegree = generateDegree(ROOT_DEGREE.id)

  expect(actualDegree).toStrictEqual(ROOT_DEGREE)
})
