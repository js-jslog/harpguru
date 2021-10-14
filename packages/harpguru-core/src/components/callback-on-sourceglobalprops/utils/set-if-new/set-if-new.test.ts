import { setIfNew } from './set-if-new'

test('setter is not called if the next is identical to the prev', () => {
  const setter1 = jest.fn()
  const setter2 = jest.fn()
  const setter3 = jest.fn()
  const prev1 = 'test'
  const prev2 = 99
  const prev3 = [1, 2, 3]
  const next1 = prev1
  const next2 = prev2
  const next3 = prev3

  setIfNew(prev1, next1, setter1)
  setIfNew(prev2, next2, setter2)
  setIfNew(prev3, next3, setter3)

  expect(setter1.mock.calls.length).toBe(0)
  expect(setter2.mock.calls.length).toBe(0)
  expect(setter3.mock.calls.length).toBe(0)
})

test('setter is not called if the next is non identical to the prev but primitive and matches Object.is', () => {
  const setter1 = jest.fn()
  const setter2 = jest.fn()
  const prev1 = 'test'
  const prev2 = 99
  const next1 = '' + prev1
  const next2 = 0 + prev2

  setIfNew(prev1, next1, setter1)
  setIfNew(prev2, next2, setter2)

  expect(setter1.mock.calls.length).toBe(0)
  expect(setter2.mock.calls.length).toBe(0)
})

test('setter is called with the next param if it is different to prev', () => {
  const setter1 = jest.fn()
  const setter2 = jest.fn()
  const prev1 = [1, 2, 3]
  const prev2 = { a: 'a' }
  const next1 = [...prev1]
  const next2 = { ...prev2 }

  setIfNew(prev1, next1, setter1)
  setIfNew(prev2, next2, setter2)

  expect(setter1.mock.calls.length).toBe(1)
  expect(setter2.mock.calls.length).toBe(1)
  expect(setter1.mock.calls[0][0]).toBe(next1)
  expect(setter2.mock.calls[0][0]).toBe(next2)
})
