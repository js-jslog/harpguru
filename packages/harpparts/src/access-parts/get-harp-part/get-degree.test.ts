import { DegreeIds } from '../../degree'

import { getDegree } from './get-degree'

test('getDegree returns a degree object', () => {
  const degree = getDegree(DegreeIds.Root)
  expect(degree).toBeTruthy()
})
