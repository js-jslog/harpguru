import { isMatchLayoutFacts } from './ismatch-layoutfacts'

test('identical layout facts are matched', () => {
  const layoutFacts = {
    harpfaceColumns: 10,
    harpfaceRows: 7,
  }
  expect(isMatchLayoutFacts(layoutFacts, layoutFacts)).toBeTruthy()
})

test('similar layout facts are matched', () => {
  const layoutFacts1 = {
    harpfaceColumns: 10,
    harpfaceRows: 7,
  }
  const layoutFacts2 = {
    harpfaceColumns: 10,
    harpfaceRows: 7,
  }
  expect(isMatchLayoutFacts(layoutFacts1, layoutFacts2)).toBeTruthy()
  expect(isMatchLayoutFacts(layoutFacts2, layoutFacts1)).toBeTruthy()
})

test('dissimilar layout facts are not matched', () => {
  const layoutFacts1 = {
    harpfaceColumns: 10,
    harpfaceRows: 7,
  }
  const layoutFacts2 = {
    harpfaceColumns: 7,
    harpfaceRows: 7,
  }
  const layoutFacts3 = {
    harpfaceColumns: 10,
    harpfaceRows: 10,
  }
  expect(isMatchLayoutFacts(layoutFacts1, layoutFacts2)).toBeFalsy()
  expect(isMatchLayoutFacts(layoutFacts2, layoutFacts1)).toBeFalsy()
  expect(isMatchLayoutFacts(layoutFacts2, layoutFacts3)).toBeFalsy()
  expect(isMatchLayoutFacts(layoutFacts3, layoutFacts2)).toBeFalsy()
  expect(isMatchLayoutFacts(layoutFacts1, layoutFacts3)).toBeFalsy()
  expect(isMatchLayoutFacts(layoutFacts3, layoutFacts1)).toBeFalsy()
})
