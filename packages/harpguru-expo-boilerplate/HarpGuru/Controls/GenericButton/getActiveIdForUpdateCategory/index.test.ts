import { PitchIds } from 'harpstrata'

import { UpdateCategories } from '../types'
import type { GenericButtonProps } from '../types'
import { keyCHarpStrata } from '../testResources'

import { getActiveIdForUpdateCategory } from './index'

test('getActiveIdForUpdateCategory returns the active harpkey when expected', () => {
  const activeHarpStrata = keyCHarpStrata
  const setActiveHarpStrata = jest.fn()
  const { HarpKey: updateCategory } = UpdateCategories
  const { D: id } = PitchIds

  const harpKeyUpdateProps: GenericButtonProps = {
    activeHarpStrata,
    setActiveHarpStrata,
    updateCategory,
    id,
  }

  const activeId = getActiveIdForUpdateCategory(harpKeyUpdateProps)

  expect(activeId).toBe(PitchIds.C)
})
