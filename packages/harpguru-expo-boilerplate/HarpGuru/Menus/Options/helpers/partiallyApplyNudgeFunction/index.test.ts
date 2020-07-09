import { partiallyApplyNudgeFunction } from './index'

test('takes a function and an object parameter and returns a function which uses them along with a direction parameter', () => {
  const nudgeFunction = jest.fn()
  const prefixString = 'test'
  const returnedFunction = partiallyApplyNudgeFunction(nudgeFunction, {prefixString})
  returnedFunction('UP')

  expect(nudgeFunction.mock.calls[0][0]).toStrictEqual({prefixString})
  expect(nudgeFunction.mock.calls[0][1]).toStrictEqual('UP')
})
