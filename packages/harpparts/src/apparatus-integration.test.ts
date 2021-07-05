import { ValvingIds } from './valving'
import { TuningIds } from './tuning'
import { matricesHaveParity } from './packages/matrices-have-parity'
import { buildApparatus } from './apparatus'
import { getTuningIds, getValvingIds } from './access-parts'

test('From each of the available tunings, both the halfstepindex interaction matrices have parity, and no errors are thrown in the process of producing them', () => {
  getTuningIds()
    .map((tuningId) =>
      getValvingIds().map((valvingId) => buildApparatus(tuningId, valvingId))
    )
    .flat()
    .forEach((apparatus) => {
      const [hasParity, errorMessages] = matricesHaveParity(
        apparatus.halfstepIndexMatrix,
        apparatus.interactionMatrix
      )
      expect(hasParity).toBeTruthy()
      expect(errorMessages).toStrictEqual([])
    })
})

test('Double check that misaligned apparatus matrices *would* produce failing errors here', () => {
  const [hasParity, errorMessages] = matricesHaveParity(
    buildApparatus(TuningIds.Richter, ValvingIds.NotValved).halfstepIndexMatrix,
    buildApparatus(TuningIds.Richter, ValvingIds.HalfValved).interactionMatrix
  )

  expect(hasParity).toBeFalsy()
  expect(errorMessages.length).toBeGreaterThan(0)
})
