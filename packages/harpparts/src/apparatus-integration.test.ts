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
      const [hasParity1, errorMessages1] = matricesHaveParity(
        apparatus.halfstepIndexMatrix[0],
        apparatus.interactionMatrix[0]
      )
      const [hasParity2, errorMessages2] = matricesHaveParity(
        apparatus.halfstepIndexMatrix[1],
        apparatus.interactionMatrix[1]
      )
      const hasParity = hasParity1 && hasParity2
      const errorMessages = [...errorMessages1, ...errorMessages2]
      expect(hasParity).toBeTruthy()
      expect(errorMessages).toStrictEqual([])
    })
})

test('Double check that misaligned apparatus matrices *would* produce failing errors here', () => {
  const [hasParity, errorMessages] = matricesHaveParity(
    buildApparatus(TuningIds.MajorDiatonic, ValvingIds.NotValved)
      .halfstepIndexMatrix[0],
    buildApparatus(TuningIds.MajorDiatonic, ValvingIds.HalfValved)
      .interactionMatrix[0]
  )

  expect(hasParity).toBeFalsy()
  expect(errorMessages.length).toBeGreaterThan(0)
})
