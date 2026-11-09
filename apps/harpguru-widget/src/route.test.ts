import { TuningIds } from 'harpparts'

import { readRoute } from './route'

test('Each path is the page CloudFront serves it from', () => {
  expect(readRoute('/s/')).toStrictEqual({ page: 'setup' })
  expect(readRoute('/s/web')).toStrictEqual({ page: 'setup' })
  expect(readRoute('/e/')).toStrictEqual({ page: 'embed' })
  expect(readRoute('/e/anything')).toStrictEqual({ page: 'embed' })
  expect(readRoute('/t/country')).toStrictEqual({
    page: 'tuning',
    tuningId: TuningIds.Country,
  })
  expect(readRoute('/t/country/')).toStrictEqual({
    page: 'tuning',
    tuningId: TuningIds.Country,
  })
})

test('Anything else is a setup page', () => {
  expect(readRoute('/')).toStrictEqual({ page: 'setup' })
  expect(readRoute('/t/no-such-harp')).toStrictEqual({ page: 'setup' })
  expect(readRoute('/t/country/extra')).toStrictEqual({ page: 'setup' })
})
