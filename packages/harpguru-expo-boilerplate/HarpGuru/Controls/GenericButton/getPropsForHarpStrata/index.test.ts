import { getHarpStrata } from 'harpstrata'

import { keyCHarpStrata } from '../testResources'

import { getPropsForHarpStrata } from './index'

test('given a HarpStrata, getPropsForHarpStrata supplies the props to generate the exact same HarpStrata again', () => {
  const sourceHarpStrata = keyCHarpStrata

  const derivedHarpStrataProps = getPropsForHarpStrata(sourceHarpStrata)

  expect(getHarpStrata(derivedHarpStrataProps)).toStrictEqual(sourceHarpStrata)
})
