import { getWithSnapProps } from './get-withsnap-props'

test('withsnaps on exact offsets are correct', () => {
  const trackLength = 100
  const maxTrackIndex = 10

  const slideOffset_1 = 0

  const withSnapProps_1 = getWithSnapProps(
    slideOffset_1,
    trackLength,
    maxTrackIndex
  )

  expect(withSnapProps_1.withSnapOffset).toBe(0)
  expect(withSnapProps_1.withSnapIndex).toBe(0)

  const slideOffset_2 = 10

  const withSnapProps_2 = getWithSnapProps(
    slideOffset_2,
    trackLength,
    maxTrackIndex
  )

  expect(withSnapProps_2.withSnapOffset).toBe(10)
  expect(withSnapProps_2.withSnapIndex).toBe(1)

  const slideOffset_3 = 90

  const withSnapProps_3 = getWithSnapProps(
    slideOffset_3,
    trackLength,
    maxTrackIndex
  )

  expect(withSnapProps_3.withSnapOffset).toBe(90)
  expect(withSnapProps_3.withSnapIndex).toBe(9)
})

test('withsnaps on nonexact offsets are correct', () => {
  const trackLength = 100
  const maxTrackIndex = 10

  const slideOffset_1a = 1
  const slideOffset_1b = 4.9

  const withSnapProps_1a = getWithSnapProps(
    slideOffset_1a,
    trackLength,
    maxTrackIndex
  )
  const withSnapProps_1b = getWithSnapProps(
    slideOffset_1b,
    trackLength,
    maxTrackIndex
  )

  expect(withSnapProps_1a.withSnapOffset).toBe(0)
  expect(withSnapProps_1a.withSnapIndex).toBe(0)
  expect(withSnapProps_1b.withSnapOffset).toBe(0)
  expect(withSnapProps_1b.withSnapIndex).toBe(0)

  const slideOffset_2a = 5
  const slideOffset_2b = 11

  const withSnapProps_2a = getWithSnapProps(
    slideOffset_2a,
    trackLength,
    maxTrackIndex
  )
  const withSnapProps_2b = getWithSnapProps(
    slideOffset_2b,
    trackLength,
    maxTrackIndex
  )

  expect(withSnapProps_2a.withSnapOffset).toBe(10)
  expect(withSnapProps_2a.withSnapIndex).toBe(1)
  expect(withSnapProps_2b.withSnapOffset).toBe(10)
  expect(withSnapProps_2b.withSnapIndex).toBe(1)

  const slideOffset_3a = 86.234253
  const slideOffset_3b = 91.234872

  const withSnapProps_3a = getWithSnapProps(
    slideOffset_3a,
    trackLength,
    maxTrackIndex
  )
  const withSnapProps_3b = getWithSnapProps(
    slideOffset_3b,
    trackLength,
    maxTrackIndex
  )

  expect(withSnapProps_3a.withSnapOffset).toBe(90)
  expect(withSnapProps_3a.withSnapIndex).toBe(9)
  expect(withSnapProps_3b.withSnapOffset).toBe(90)
  expect(withSnapProps_3b.withSnapIndex).toBe(9)
})
