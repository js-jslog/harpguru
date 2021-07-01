import { getDegreeIds } from '../get-ordered-part-ids'
import { DegreeIds } from '../../degree'

import { getDegree } from './get-degree'

test('getDegree returns a degree object', () => {
  const degree = getDegree(DegreeIds.Root)
  expect(degree.id).toBe(DegreeIds.Root)
})

test('All the degree ids available have a counterpart object to recover', () => {
  getDegreeIds().forEach((degreeId) =>
    expect(() => getDegree(degreeId)).not.toThrow()
  )
})
