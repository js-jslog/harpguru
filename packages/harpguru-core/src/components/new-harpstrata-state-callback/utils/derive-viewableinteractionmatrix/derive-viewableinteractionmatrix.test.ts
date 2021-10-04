import { InteractionIds } from 'harpparts'

import { deriveViewableInteractionMatrix } from './derive-viewableinteractionmatrix'

const blow = { id: InteractionIds.Blow }
const draw = { id: InteractionIds.Draw }
const blowbend = { id: InteractionIds.BlowBend1 }
const drawbend = { id: InteractionIds.DrawBend1 }
const overblow = { id: InteractionIds.OverBlow1 }

test('identical matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const fullMatrix1 = [
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, drawbend, drawbend, drawbend, drawbend],
  ]
  const fullMatrix2 = [
    [overblow, overblow, overblow, overblow, undefined],
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, undefined, drawbend, drawbend, drawbend],
  ]
  const fullMatrix3 = [
    [blowbend, undefined],
    [blow, blow],
    [draw, draw],
    [undefined, drawbend],
  ]

  expect(deriveViewableInteractionMatrix(fullMatrix1, columnBounds)).toBe(
    fullMatrix1
  )
  expect(deriveViewableInteractionMatrix(fullMatrix2, columnBounds)).toBe(
    fullMatrix2
  )
  expect(deriveViewableInteractionMatrix(fullMatrix3, columnBounds)).toBe(
    fullMatrix3
  )
})

test('sliced matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const fullMatrix1 = [
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, drawbend, drawbend, drawbend, drawbend],
  ]
  const slicedMatrix1 = [
    [blow, blow],
    [draw, draw],
    [drawbend, drawbend],
  ]
  const fullMatrix2 = [
    [overblow, overblow, overblow, overblow, undefined],
    [blow, blow, blow, blow, blow],
    [draw, draw, draw, draw, draw],
    [drawbend, undefined, drawbend, drawbend, drawbend],
  ]
  const slicedMatrix2 = [
    [overblow, overblow],
    [blow, blow],
    [draw, draw],
    [drawbend, undefined],
  ]
  const fullMatrix3 = [
    [blowbend, undefined],
    [blow, blow],
    [draw, draw],
    [undefined, drawbend],
  ]

  expect(
    deriveViewableInteractionMatrix(fullMatrix1, columnBounds)
  ).toStrictEqual(slicedMatrix1)
  expect(
    deriveViewableInteractionMatrix(fullMatrix2, columnBounds)
  ).toStrictEqual(slicedMatrix2)
  expect(
    deriveViewableInteractionMatrix(fullMatrix3, columnBounds)
  ).toStrictEqual(fullMatrix3)
})
