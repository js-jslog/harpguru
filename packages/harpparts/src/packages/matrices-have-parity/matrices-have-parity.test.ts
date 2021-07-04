import { matricesHaveParity } from './matrices-have-parity'

test('matricesHaveParity returns true for simple parity matrices', () => {
  const matrixA = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
  ]

  expect(matricesHaveParity(matrixA, matrixA)[0]).toBeTruthy()
  expect(JSON.stringify(matricesHaveParity(matrixA, matrixA)[1])).toEqual(
    expect.stringContaining('[]')
  )
})

test('matricesHaveParity returns false for matrices with mismatched 1st row length', () => {
  const matrixA = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
  ]
  const matrixB = [
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
  ]

  expect(matricesHaveParity(matrixA, matrixB)[0]).toBeFalsy()
  expect(JSON.stringify(matricesHaveParity(matrixA, matrixB)[1])).toEqual(
    expect.stringContaining('[2, 5] vs [2, 4]')
  )
})

test('matricesHaveParity returns false for matrices with mismatched 1st row population', () => {
  const matrixA = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
  ]
  const matrixB = [
    [1, 2, 3, 4, undefined],
    [1, 2, 3, 4, 5],
  ]

  expect(matricesHaveParity(matrixA, matrixB)[0]).toBeFalsy()
  expect(JSON.stringify(matricesHaveParity(matrixA, matrixB)[1])).toEqual(
    expect.stringContaining('(0,4)')
  )
})

test('matricesHaveParity returns false for matrices with mismatched 2nd row population', () => {
  const matrixA = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
  ]
  const matrixB = [
    [6, 3, 1, 6, 5],
    [1, 2, 3, 4, undefined],
  ]

  expect(matricesHaveParity(matrixA, matrixB)[0]).toBeFalsy()
  expect(JSON.stringify(matricesHaveParity(matrixA, matrixB)[1])).toEqual(
    expect.stringContaining('(1,4)')
  )
})

test('matricesHaveParity returns both types of error message if relevant', () => {
  const matrixA = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
  ]
  const matrixB = [
    [1, 2, 3, 4],
    [1, 2, 3, undefined, 5],
  ]

  expect(matricesHaveParity(matrixA, matrixB)[0]).toBeFalsy()
  expect(JSON.stringify(matricesHaveParity(matrixA, matrixB)[1])).toEqual(
    expect.stringContaining('[2, 5] vs [2, 4]')
  )
  expect(JSON.stringify(matricesHaveParity(matrixA, matrixB)[1])).toEqual(
    expect.stringContaining('(1,3)')
  )
})
