import { matricesHaveParity } from './packages/matrices-have-parity'
import { buildApparatus } from './apparatus'
import { getTuningIds, getValvingIds } from './access-parts'

// It would also be nice to get all the results of the partiy check in before the test fails too.
// We need to check that this test fails if a reed config is made available which is leads to a hole array error.
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
