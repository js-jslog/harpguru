//import { useGlobal } from 'reactn'
//import { DegreeIds, InteractionIds, PitchIds } from 'harpparts'
//
//import { inactiveCellsHarpStrata } from '../../test-resources'
//
//import { useViewableMatrices } from './use-viewable-matrices'

//jest.mock('reactn')
//const mockUseGlobal = useGlobal as jest.Mock

test('true is true - dummy while this file is being replaced elsewhere', () => {
  expect(true).toBeTruthy()
})

//test('Entire degreeMatrix is viewable when columnBounds is FIT', () => {
//  mockUseGlobal.mockImplementation((stateItem: string) => {
//    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
//    if (stateItem === 'columnBounds') return ['FIT']
//    return undefined
//  })
//
//  expect(useViewableMatrices().viewableDegreeMatrix).toStrictEqual(
//    inactiveCellsHarpStrata.degreeMatrix
//  )
//})
//
//test('First column of degreeMatrix is viewable when columnBounds is [0, 0]', () => {
//  const { Root, Second, Third } = DegreeIds
//  // TODO: This is actually subverting the type checking.
//  // This matrix should be of Degree objects, not DegreeIds
//  const simplifiedDegreeMatrix = [
//    [Root, Second, Third],
//    [Second, Third, Root],
//    [Third, Second, Root],
//  ]
//  const modifiedHarpStrata = {
//    ...inactiveCellsHarpStrata,
//    degreeMatrix: simplifiedDegreeMatrix,
//  }
//  const expectedViewableMatrix = [[Root], [Second], [Third]]
//  mockUseGlobal.mockImplementation((stateItem: string) => {
//    if (stateItem === 'activeHarpStrata') return [modifiedHarpStrata]
//    if (stateItem === 'columnBounds') return [[0, 0]]
//    return undefined
//  })
//
//  expect(useViewableMatrices().viewableDegreeMatrix).toStrictEqual(
//    expectedViewableMatrix
//  )
//})
//
//test('Middle columns of degreeMatrix are viewable when columnBounds is [1, 2]', () => {
//  const { Root, Second, Third } = DegreeIds
//  const simplifiedDegreeMatrix = [
//    [Second, Root, Second, Third],
//    [Second, Second, Third, Root],
//    [Second, Third, Second, Root],
//  ]
//  const modifiedHarpStrata = {
//    ...inactiveCellsHarpStrata,
//    degreeMatrix: simplifiedDegreeMatrix,
//  }
//  const expectedViewableMatrix = [
//    [Root, Second],
//    [Second, Third],
//    [Third, Second],
//  ]
//  mockUseGlobal.mockImplementation((stateItem: string) => {
//    if (stateItem === 'activeHarpStrata') return [modifiedHarpStrata]
//    if (stateItem === 'columnBounds') return [[1, 2]]
//    return undefined
//  })
//
//  expect(useViewableMatrices().viewableDegreeMatrix).toStrictEqual(
//    expectedViewableMatrix
//  )
//})
//
//test('Blank rows are removed from the viewable matrix even if the broader context isnt empty', () => {
//  const { Root, Second, Third } = DegreeIds
//  const simplifiedDegreeMatrix = [
//    [Second, undefined, undefined, undefined],
//    [Second, Root, Second, Third],
//    [Second, Second, Third, Root],
//    [Second, Third, Second, Root],
//    [Second, Third, Second, Root],
//    [undefined, undefined, undefined, Second],
//  ]
//  const modifiedHarpStrata = {
//    ...inactiveCellsHarpStrata,
//    degreeMatrix: simplifiedDegreeMatrix,
//  }
//  const expectedViewableMatrix = [
//    [Root, Second],
//    [Second, Third],
//    [Third, Second],
//    [Third, Second],
//  ]
//  mockUseGlobal.mockImplementation((stateItem: string) => {
//    if (stateItem === 'activeHarpStrata') return [modifiedHarpStrata]
//    if (stateItem === 'columnBounds') return [[1, 2]]
//    return undefined
//  })
//
//  expect(useViewableMatrices().viewableDegreeMatrix).toStrictEqual(
//    expectedViewableMatrix
//  )
//})
//
//test('Entire pitchMatrix is viewable when columnBounds is FIT', () => {
//  mockUseGlobal.mockImplementation((stateItem: string) => {
//    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
//    if (stateItem === 'columnBounds') return ['FIT']
//    return undefined
//  })
//
//  expect(useViewableMatrices().viewablePitchMatrix).toStrictEqual(
//    inactiveCellsHarpStrata.pitchMatrix
//  )
//})
//
//test('Bounded pitch matrix can be returned', () => {
//  const { A, B, C } = PitchIds
//  // TODO: This is actually subverting the type checking.
//  // This matrix should be of Pitch objects, not PitchIds
//  const simplifiedPitchMatrix = [
//    [B, undefined, undefined, undefined],
//    [B, A, B, C],
//    [B, B, C, A],
//    [B, C, B, A],
//    [B, C, B, A],
//    [undefined, undefined, undefined, B],
//  ]
//  const modifiedHarpStrata = {
//    ...inactiveCellsHarpStrata,
//    pitchMatrix: simplifiedPitchMatrix,
//  }
//  const expectedViewableMatrix = [
//    [A, B],
//    [B, C],
//    [C, B],
//    [C, B],
//  ]
//  mockUseGlobal.mockImplementation((stateItem: string) => {
//    if (stateItem === 'activeHarpStrata') return [modifiedHarpStrata]
//    if (stateItem === 'columnBounds') return [[1, 2]]
//    return undefined
//  })
//
//  expect(useViewableMatrices().viewablePitchMatrix).toStrictEqual(
//    expectedViewableMatrix
//  )
//})
//
//test('Entire interactionMatrix is viewable when columnBounds is FIT', () => {
//  mockUseGlobal.mockImplementation((stateItem: string) => {
//    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
//    if (stateItem === 'columnBounds') return ['FIT']
//    return undefined
//  })
//
//  expect(useViewableMatrices().viewableInteractionMatrix).toStrictEqual(
//    inactiveCellsHarpStrata.apparatus.interactionMatrix
//  )
//})
//
//test('Bounded interaction matrix can be returned', () => {
//  const { Blow, Draw, DrawBend1 } = InteractionIds
//  // TODO: This is actually subverting the type checking.
//  // This matrix should be of Interaction objects, not InteractionIds
//  const simplifiedInteractionMatrix = [
//    [Draw, undefined, undefined, undefined],
//    [Draw, Blow, Draw, DrawBend1],
//    [Draw, Draw, DrawBend1, Blow],
//    [Draw, DrawBend1, Draw, Blow],
//    [Draw, DrawBend1, Draw, Blow],
//    [undefined, undefined, undefined, Draw],
//  ]
//  const modifiedHarpStrata = {
//    ...inactiveCellsHarpStrata,
//    apparatus: {
//      ...inactiveCellsHarpStrata.apparatus,
//      interactionMatrix: simplifiedInteractionMatrix,
//    },
//  }
//  const expectedViewableMatrix = [
//    [Blow, Draw],
//    [Draw, DrawBend1],
//    [DrawBend1, Draw],
//    [DrawBend1, Draw],
//  ]
//  mockUseGlobal.mockImplementation((stateItem: string) => {
//    if (stateItem === 'activeHarpStrata') return [modifiedHarpStrata]
//    if (stateItem === 'columnBounds') return [[1, 2]]
//    return undefined
//  })
//
//  expect(useViewableMatrices().viewableInteractionMatrix).toStrictEqual(
//    expectedViewableMatrix
//  )
//})
