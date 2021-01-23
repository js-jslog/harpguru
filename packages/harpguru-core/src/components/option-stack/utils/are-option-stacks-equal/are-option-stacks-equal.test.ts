import * as isProdWrapper from '../is-prod/is-prod'

import { areOptionStacksEqual } from './are-option-stacks-equal'

// The dev mode and production mode tests should be identical except that
// dev mismatching param comparison returns false while production throws
// an error.

describe('OptionStack params equality check in dev mode', () => {
  test('that two actually identical option props are identified as equal', () => {
    const optionProps = {
      title: 'Scales',
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
      title: 'Scales',
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
      title: 'Scales',
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
      title: 'Scales',
      useItems: jest.fn(),
      twoColumns: false,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, title: 'Not scales' }
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

  test('that two identical (other than useSubTitle) option props are identified as not equal', () => {
    const useSubTitle1 = jest.fn()
    const useSubTitle2 = jest.fn()
    const baseOptionProps = {
      title: 'Scales',
      useSubTitle: useSubTitle1,
      useItems: jest.fn(),
      twoColumns: false,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, useSubTitle: useSubTitle2 }
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
      title: 'Scales',
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
      title: 'Scales',
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
      title: 'Scales',
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
      title: 'Scales',
      useItems: jest.fn(),
      twoColumns: false,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, title: 'Not scales' }
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

  test('that two identical (other than useSubTitle) option props are identified as not equal', () => {
    const useSubTitle1 = jest.fn()
    const useSubTitle2 = jest.fn()
    const baseOptionProps = {
      title: 'Scales',
      useSubTitle: useSubTitle1,
      useItems: jest.fn(),
      twoColumns: false,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, useSubTitle: useSubTitle2 }
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
})
