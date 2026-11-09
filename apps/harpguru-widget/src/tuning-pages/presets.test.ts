import { getUnbentScale } from './unbent-scale'
import { tuningPresets } from './tuning-presets'
import { getPagedTuningIds, getPresets } from './presets'

test('Every tuning offers at least one pozition, none twice', () => {
  getPagedTuningIds().forEach((tuningId) => {
    const { pozitions = [] } = tuningPresets[tuningId] ?? {}
    expect(pozitions.length).toBeGreaterThan(0)
    expect(new Set(pozitions).size).toBe(pozitions.length)
  })
})

test('A scale is chosen by hand only where the unbent notes make none, and only for an offered pozition', () => {
  getPagedTuningIds().forEach((tuningId) => {
    const { pozitions = [], scales = {} } = tuningPresets[tuningId] ?? {}
    Object.keys(scales).forEach((pozitionId) => {
      const pozition = pozitionId as typeof pozitions[number]
      expect({ tuningId, pozitionId, offered: pozitions.includes(pozition) }).toEqual({
        tuningId,
        pozitionId,
        offered: true,
      })
      expect({ tuningId, pozitionId, computed: getUnbentScale(tuningId, pozition) }).toEqual({
        tuningId,
        pozitionId,
        computed: undefined,
      })
    })
  })
})

// A record of what every tuning page offers, so a change to the table or to
// a tuning's reeds shows up in review
test('What each tuning page offers', () => {
  const offered = Object.fromEntries(
    getPagedTuningIds().map((tuningId) => [
      tuningId,
      getPresets(tuningId).map(
        ({ pozitionId, scaleLabel }) => `${pozitionId}: ${scaleLabel}`
      ),
    ])
  )
  expect(offered).toMatchSnapshot()
})
