import { compareColumnBounds } from './compare-column-bounds'

test('two identical columnBounds match', () => {
  const columnBounds = 'FIT'
  expect(compareColumnBounds(columnBounds, columnBounds)).toBeTruthy()
})
