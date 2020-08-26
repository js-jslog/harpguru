import type { CovariantControllers, CovariantSet } from '../types'
import {
  areHarpKeyControllers,
  areRootPitchControllers,
  arePozitionControllers,
} from '../typeguards'
import { deduceRootPitchId } from '../deduceRootPitchId'
import { deducePozitionId } from '../deducePozitionId'
import { deduceHarpKeyId } from '../deduceHarpKeyId'

export const getCovariantSet = (
  controlVariables: CovariantControllers
): CovariantSet => {
  if (areHarpKeyControllers(controlVariables)) {
    const { rootPitchId, pozitionId } = controlVariables
    const harpKeyId = deduceHarpKeyId(controlVariables)

    return { harpKeyId, pozitionId, rootPitchId }
  } else if (arePozitionControllers(controlVariables)) {
    const { rootPitchId, harpKeyId } = controlVariables
    const pozitionId = deducePozitionId(controlVariables)

    return { harpKeyId, pozitionId, rootPitchId }
  } else if (areRootPitchControllers(controlVariables)) {
    const { harpKeyId, pozitionId } = controlVariables
    const rootPitchId = deduceRootPitchId(controlVariables)

    return { harpKeyId, pozitionId, rootPitchId }
  }

  const errorMessage = `
    Input args did not meet control variable expectations.

    Input: ${JSON.stringify(controlVariables)}

    Two of the CovariantSet properties need to be defined.
  `
  throw new Error(errorMessage)
}
