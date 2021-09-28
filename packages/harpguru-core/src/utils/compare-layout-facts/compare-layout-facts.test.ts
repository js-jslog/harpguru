import { compareLayoutFacts } from './compare-layout-facts'

test('identical layout facts are matched', () => {
  const layoutFacts = {
    harpfaceColumns: 10,
    harpfaceRows: 7,
  }
  expect(compareLayoutFacts(layoutFacts, layoutFacts)).toBeTruthy()
})
