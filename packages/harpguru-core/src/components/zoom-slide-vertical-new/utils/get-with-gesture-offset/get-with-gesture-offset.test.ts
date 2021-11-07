import { getWithGestureOffset } from './get-with-gesture-offset'

test('minimum offset following gesture is 0', () => {
  const offset_1 = 0
  const translationY_1 = 0
  expect(getWithGestureOffset(offset_1, translationY_1)).toBe(0)

  const offset_2 = 0
  const translationY_2 = -10
  expect(getWithGestureOffset(offset_2, translationY_2)).toBe(0)

  const offset_3 = 100
  const translationY_3 = -100
  expect(getWithGestureOffset(offset_3, translationY_3)).toBe(0)

  const offset_4 = 100
  const translationY_4 = -200
  expect(getWithGestureOffset(offset_4, translationY_4)).toBe(0)
})
