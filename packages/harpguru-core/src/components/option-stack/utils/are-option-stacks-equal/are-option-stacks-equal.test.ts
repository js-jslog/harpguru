import { DegreeIds } from 'harpparts'

import * as isProdWrapper from '../is-prod/is-prod'
import type { OptionProps_Scales, OptionStackProps } from '../../../../types'

import { areOptionStacksEqual } from './are-option-stacks-equal'

// The dev mode and production mode tests should be identical except that
// dev mismatching param comparison returns false while production throws
// an error.

describe('OptionStack params equality check in dev mode', () => {
  test('that two actually identical option props are identified as equal', () => {
    const itemTapHandler = jest.fn()
    const optionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const stackProps: OptionStackProps = {
      optionPropsz: [optionProps],
    }

    expect(areOptionStacksEqual(stackProps, stackProps)).toBeTruthy()
  })

  test('that two stacks of different lengths are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const optionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps, optionProps],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
  })

  test('that two distinct stack props with identical option props are identified as equal', () => {
    const itemTapHandler = jest.fn()
    const optionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeTruthy()
  })

  test('that two identical (other than title) option props are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, title: 'Not scales' }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that two identical (other than useSubTitle) option props are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const useSubTitle1 = jest.fn()
    const useSubTitle2 = jest.fn()
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      useSubTitle: useSubTitle1,
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, useSubTitle: useSubTitle2 }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that two identical (other than items length) option props are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const items1 = [
      {
        label: 'item1',
        callbackParam: [DegreeIds.Root],
      },
    ]
    const items2 = [
      {
        label: 'item1',
        callbackParam: [DegreeIds.Root],
      },
      {
        label: 'item2',
        callbackParam: [DegreeIds.Root],
      },
    ]
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: items1,
      twoColumns: false,
      itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, items: items2 }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that two identical (other than itemTapHandler) option props are identified as not equal', () => {
    const itemTapHandler1 = jest.fn()
    const itemTapHandler2 = jest.fn()
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler: itemTapHandler1,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, itemTapHandler: itemTapHandler2 }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that option props with distinct but matching items in the list changed are identified equal', () => {
    const itemTapHandler = jest.fn()
    const item1 = { label: 'item1', callbackParam: [DegreeIds.Root] }
    const item2 = { label: 'item1', callbackParam: [DegreeIds.Root] }
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [{ ...item1 }],
      twoColumns: false,
      itemTapHandler: itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, items: [{ ...item2 }] }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toBeTruthy()
  })

  test('that option props with a single item in the list changed are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const item1 = { label: 'item1', callbackParam: [DegreeIds.Root] }
    const item2 = { label: 'item2', callbackParam: [DegreeIds.Root] }
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [{ ...item1 }],
      twoColumns: false,
      itemTapHandler: itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, items: [{ ...item2 }] }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
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
    const itemTapHandler = jest.fn()
    const optionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const stackProps: OptionStackProps = {
      optionPropsz: [optionProps],
    }

    expect(areOptionStacksEqual(stackProps, stackProps)).toBeTruthy()
  })

  test('that two stacks of different lengths are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const optionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps, optionProps],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
  })

  test('that two distinct stack props with identical option props are identified as equal', () => {
    const itemTapHandler = jest.fn()
    const optionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps],
    }

    expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeTruthy()
  })

  test('that two identical (other than title) option props are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, title: 'Not scales' }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that two identical (other than useSubTitle) option props are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const useSubTitle1 = jest.fn()
    const useSubTitle2 = jest.fn()
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      useSubTitle: useSubTitle1,
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, useSubTitle: useSubTitle2 }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that two identical (other than items length) option props are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const items1 = [
      {
        label: 'item1',
        callbackParam: [DegreeIds.Root],
      },
    ]
    const items2 = [
      {
        label: 'item1',
        callbackParam: [DegreeIds.Root],
      },
      {
        label: 'item2',
        callbackParam: [DegreeIds.Root],
      },
    ]
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: items1,
      twoColumns: false,
      itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, items: items2 }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that two identical (other than itemTapHandler) option props are identified as not equal', () => {
    const itemTapHandler1 = jest.fn()
    const itemTapHandler2 = jest.fn()
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [
        {
          label: 'item1',
          callbackParam: [DegreeIds.Root],
        },
      ],
      twoColumns: false,
      itemTapHandler: itemTapHandler1,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, itemTapHandler: itemTapHandler2 }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })

  test('that option props with distinct but matching items in the list changed are identified equal', () => {
    const itemTapHandler = jest.fn()
    const item1 = { label: 'item1', callbackParam: [DegreeIds.Root] }
    const item2 = { label: 'item1', callbackParam: [DegreeIds.Root] }
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [{ ...item1 }],
      twoColumns: false,
      itemTapHandler: itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, items: [{ ...item2 }] }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toBeTruthy()
  })

  test('that option props with a single item in the list changed are identified as not equal', () => {
    const itemTapHandler = jest.fn()
    const item1 = { label: 'item1', callbackParam: [DegreeIds.Root] }
    const item2 = { label: 'item2', callbackParam: [DegreeIds.Root] }
    const baseOptionProps: OptionProps_Scales = {
      title: 'Scales',
      items: [{ ...item1 }],
      twoColumns: false,
      itemTapHandler: itemTapHandler,
    }
    const optionProps1 = baseOptionProps
    const optionProps2 = { ...baseOptionProps, items: [{ ...item2 }] }
    const stackProps1: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }
    const stackProps2: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps2],
    }
    const stackPropsControl: OptionStackProps = {
      optionPropsz: [optionProps1, optionProps1],
    }

    expect(() => areOptionStacksEqual(stackProps1, stackProps2)).toThrow()
    expect(areOptionStacksEqual(stackProps1, stackPropsControl)).toBeTruthy()
  })
})
