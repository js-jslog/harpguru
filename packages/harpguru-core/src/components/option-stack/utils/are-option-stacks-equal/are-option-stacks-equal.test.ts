import * as isProdWrapper from '../is-prod/is-prod'

import { areOptionStacksEqual } from './are-option-stacks-equal'

// The dev mode and production mode tests should be identical except that
// dev mismatching param comparison returns false while production throws
// an error.

describe('OptionStack params equality check in dev mode', () => {
  test('that two actually identical option props are identified as equal', () => {
    const optionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const stackProps = {
      optionPropsz: [optionProps],
    }

    expect(areOptionStacksEqual(stackProps, stackProps)).toBeTruthy()
  })

  test('that two stacks of different lengths are identified as not equal', () => {
    const optionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const stackProps1 = {
      optionPropsz: [optionProps],
    }
    const stackProps2 = {
      optionPropsz: [optionProps, optionProps],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
  })

  test('that two distinct stack props with identical option props are identified as equal', () => {
    const optionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const stackProps1 = {
      optionPropsz: [optionProps],
    }
    const stackProps2 = {
      optionPropsz: [optionProps],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeTruthy()
  })

  test('that two identical (other than title) option props are identified as not equal', () => {
    const baseOptionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, useTitle: jest.fn() }
    const stackProps1 = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2 = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that two identical (other than the items) option props are identified as not equal', () => {
    const baseOptionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, useItems: jest.fn() }
    const stackProps1 = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2 = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that option props differing or equaling on the twoColumn property are correctly classified', () => {
    const baseOptionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, twoColumns: true }
    const optionProps3 = { ...baseOptionProps, twoColumns: false }
    const stackProps1 = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2 = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackProps3 = {
      optionPropsz: [optionProps1, optionProps3],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps1, stackProps3)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps2, stackProps3)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps1, stackProps1)).toBeTruthy()
    expect(areOptionStacksEqual(stackProps2, stackProps2)).toBeTruthy()
    expect(areOptionStacksEqual(stackProps3, stackProps3)).toBeTruthy()
  })

  test('that option props differing or equaling on the label hooks properties are correctly classified', () => {
    const useColumnLabel1 = jest.fn()
    const useColumnLabel2 = jest.fn()
    const baseOptionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = {
      ...baseOptionProps,
      useLeftColumnLabel: useColumnLabel1,
    }
    const optionProps3 = {
      ...baseOptionProps,
      useRightColumnLabel: useColumnLabel2,
    }
    const stackProps1 = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2 = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackProps3 = {
      optionPropsz: [optionProps1, optionProps3],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps1)).toBeTruthy()
    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps1, stackProps3)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps2, stackProps3)).toBeFalsy()
  })
})

describe('OptionStack params equality check in production mode', () => {
  const mock = jest.spyOn(isProdWrapper, 'isProd')
  beforeAll(() => {
    mock.mockReturnValue(true)
  })

  afterAll(() => {
    mock.mockRestore()
  })

  test('that two actually identical option props are identified as equal', () => {
    const optionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const stackProps = {
      optionPropsz: [optionProps],
    }

    expect(areOptionStacksEqual(stackProps, stackProps)).toBeTruthy()
  })

  test('that two stacks of different lengths are identified as not equal', () => {
    const optionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const stackProps1 = {
      optionPropsz: [optionProps],
    }
    const stackProps2 = {
      optionPropsz: [optionProps, optionProps],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
  })

  test('that two distinct stack props with identical option props are identified as equal', () => {
    const optionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const stackProps1 = {
      optionPropsz: [optionProps],
    }
    const stackProps2 = {
      optionPropsz: [optionProps],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeTruthy()
  })

  test('that two identical (other than title) option props are identified as not equal', () => {
    const baseOptionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, useTitle: jest.fn() }
    const stackProps1 = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2 = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that two identical (other than the items) option props are identified as not equal', () => {
    const baseOptionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
      twoColumns: false,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, useItems: jest.fn() }
    const stackProps1 = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2 = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that option props differing or equaling on the twoColumn property are correctly classified', () => {
    const baseOptionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, twoColumns: true }
    const optionProps3 = { ...baseOptionProps, twoColumns: false }
    const stackProps1 = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2 = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackProps3 = {
      optionPropsz: [optionProps1, optionProps3],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
    expect(() => areOptionStacksEqual(stackProps1, stackProps3)).toThrow()
    expect(() => areOptionStacksEqual(stackProps2, stackProps3)).toThrow()
    expect(areOptionStacksEqual(stackProps1, stackProps1)).toBeTruthy()
    expect(areOptionStacksEqual(stackProps2, stackProps2)).toBeTruthy()
    expect(areOptionStacksEqual(stackProps3, stackProps3)).toBeTruthy()
  })

  test('that option props differing or equaling on the label hooks properties are correctly classified', () => {
    const useColumnLabel1 = jest.fn()
    const useColumnLabel2 = jest.fn()
    const baseOptionProps = {
      useTitle: jest.fn(),
      useItems: jest.fn(),
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = {
      ...baseOptionProps,
      useLeftColumnLabel: useColumnLabel1,
    }
    const optionProps3 = {
      ...baseOptionProps,
      useRightColumnLabel: useColumnLabel2,
    }
    const stackProps1 = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2 = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackProps3 = {
      optionPropsz: [optionProps1, optionProps3],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps1)).toBeTruthy()
    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
    expect(() => areOptionStacksEqual(stackProps1, stackProps3)).toThrow()
    expect(() => areOptionStacksEqual(stackProps2, stackProps3)).toThrow()
  })
})
