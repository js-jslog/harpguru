import { DegreeIds } from 'harpparts'

import type { OptionProps_Scales, OptionStackProps } from '../../types'

import { areOptionStacksEqual } from './are-option-stacks-equal'

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
    itemTapHandler,
  }
  const stackProps: OptionStackProps = {
    stackPropsz: [optionProps],
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
    itemTapHandler,
  }
  const stackProps1: OptionStackProps = {
    stackPropsz: [optionProps],
  }
  const stackProps2: OptionStackProps = {
    stackPropsz: [optionProps, optionProps],
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
    itemTapHandler,
  }
  const stackProps1: OptionStackProps = {
    stackPropsz: [optionProps],
  }
  const stackProps2: OptionStackProps = {
    stackPropsz: [optionProps],
  }

  expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeTruthy()
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
    itemTapHandler: itemTapHandler1,
  }
  const optionProps1 = baseOptionProps
  const optionProps2 = { ...baseOptionProps, itemTapHandler: itemTapHandler2 }
  const stackProps1: OptionStackProps = {
    stackPropsz: [optionProps1],
  }
  const stackProps2: OptionStackProps = {
    stackPropsz: [optionProps2],
  }

  expect(areOptionStacksEqual(stackProps1, stackProps2)).toBeFalsy()
})
