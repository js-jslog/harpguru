import { tuningPresets } from './tuning-presets'
import {
  getPagedTuningIds,
  getPresets,
  getTuningGroups,
  getTuningDescription,
  getUnbentScale,
} from './presets'
import { describeHomeHoles, getHomeHoles } from './home-holes'

test('Every tuning offers at least one pozition, none twice', () => {
  getPagedTuningIds().forEach((tuningId) => {
    const { pozitions = [] } = tuningPresets[tuningId] ?? {}
    const pozitionIds = pozitions.map(({ pozitionId }) => pozitionId)
    expect(pozitionIds.length).toBeGreaterThan(0)
    expect(new Set(pozitionIds).size).toBe(pozitionIds.length)
  })
})

test('A scale is chosen by hand only where the unbent notes make none', () => {
  getPagedTuningIds().forEach((tuningId) => {
    const { pozitions = [] } = tuningPresets[tuningId] ?? {}
    pozitions
      .filter(({ scaleId }) => scaleId !== undefined)
      .forEach(({ pozitionId }) => {
        expect({
          tuningId,
          pozitionId,
          computed: getUnbentScale(tuningId, pozitionId),
        }).toEqual({ tuningId, pozitionId, computed: undefined })
      })
  })
})

test('Every tuning and pozition has its text and a home hole', () => {
  getPagedTuningIds().forEach((tuningId) => {
    expect(getTuningDescription(tuningId)).not.toBe('')
    getPresets(tuningId).forEach(({ pozitionId, description }) => {
      expect({ tuningId, pozitionId, description }).not.toEqual({
        tuningId,
        pozitionId,
        description: '',
      })
      expect(getHomeHoles(tuningId, pozitionId).length).toBeGreaterThan(0)
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
        ({ pozitionId, scaleLabel }) =>
          `${pozitionId}: ${scaleLabel}, home ${describeHomeHoles(
            getHomeHoles(tuningId, pozitionId)
          )}`
      ),
    ])
  )
  expect(offered).toMatchSnapshot()
})

test('The drawer groups every tuning with a page once, as the app groups them', () => {
  const groups = getTuningGroups()
  expect(groups.flatMap(({ tuningIds }) => tuningIds).sort()).toEqual(
    [...getPagedTuningIds()].sort()
  )
  expect(groups.map(({ category }) => category)).toEqual([
    'Common diatonic',
    'Common chromatic',
    'Seydel',
    'Brendan Power',
  ])
})
