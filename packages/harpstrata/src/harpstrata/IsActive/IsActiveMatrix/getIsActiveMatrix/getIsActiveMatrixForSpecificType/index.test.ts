import { IsActiveIds } from '../../types'
import type { IsActiveProps } from '../../../types'
import { C, D, E, F, PitchIds } from '../../../../Pitch'
import { ROOT, SECOND, THIRD, FOURTH, DegreeIds } from '../../../../Degree'

import { getMatrixGivenPitch, getMatrixGivenDegree,  } from './index'

const degreeMatrix = [
  [ ROOT , SECOND ],
  [ THIRD, FOURTH ],
]
const pitchMatrix = [
  [ C, D ],
  [ E, F ],
]
const baseIsActiveProps: IsActiveProps = {
  degreeMatrix, pitchMatrix, activeIds: []
}

test('getMatrixGivenDegree returns a IsActiveMatrix using Degree objects', () => {
  const isActiveProps = { ...baseIsActiveProps, activeIds: [ DegreeIds.Root, DegreeIds.Fourth ] }
  const expectedIsActiveMatrix = [
    [ IsActiveIds.Active  , IsActiveIds.Inactive ],
    [ IsActiveIds.Inactive, IsActiveIds.Active   ],
  ]
  const actualIsActiveMatrix = getMatrixGivenDegree(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})

test('getMatrixGivenPitch returns a IsActiveMatrix using Pitch objects', () => {
  const isActiveProps = { ...baseIsActiveProps, activeIds: [ PitchIds.D, PitchIds.E ] }
  const expectedIsActiveMatrix = [
    [ IsActiveIds.Inactive, IsActiveIds.Active   ],
    [ IsActiveIds.Active  , IsActiveIds.Inactive ],
  ]
  const actualIsActiveMatrix = getMatrixGivenPitch(isActiveProps)

  expect(actualIsActiveMatrix).toStrictEqual(expectedIsActiveMatrix)
})
