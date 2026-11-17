import { toQR } from 'toqr'

import { getQrRuns } from './get-qr-runs'

const link =
  'https://harpguru.com/s/?t=major-diatonic&k=C&p=2&d=1,3b,4,5b,5,7b&m=pitch&v=half'

test('The runs cover exactly the dark modules of the code, each once', () => {
  const modules = toQR(link)
  const { size, runs } = getQrRuns(link)
  expect(size * size).toBe(modules.length)

  const drawn = new Uint8Array(size * size)
  runs.forEach(({ row, start, length }) => {
    expect(length).toBeGreaterThan(0)
    expect(start + length).toBeLessThanOrEqual(size)
    for (let column = start; column < start + length; column++) {
      expect(drawn[row * size + column]).toBe(0)
      drawn[row * size + column] = 1
    }
  })
  expect(Array.from(drawn)).toEqual(Array.from(modules))
})

test('A run ends at its row\'s edge and never wraps into the next row', () => {
  const { runs } = getQrRuns(link)
  // The finder pattern's top edge: seven dark modules from the top left
  expect(runs[0]).toEqual({ row: 0, start: 0, length: 7 })
})

test('A setup link draws as far fewer runs than modules', () => {
  const { size, runs } = getQrRuns(link)
  expect(runs.length).toBeLessThan((size * size) / 2)
})
