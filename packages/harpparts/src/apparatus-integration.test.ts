import { ValvingIds } from './valving'
import { TuningIds } from './tuning'
import { matricesHaveParity } from './packages/matrices-have-parity'
import { buildApparatus } from './apparatus'
import { getTuningIds, getValvingIds } from './access-parts'

import { isChromaticHarpFace } from './types'

test('From each of the available tunings, both the halfstepindex interaction matrices have parity, and no errors are thrown in the process of producing them', () => {
  getTuningIds()
    .map((tuningId) =>
      getValvingIds().map((valvingId) => buildApparatus(tuningId, valvingId))
    )
    .flat()
    .forEach((apparatus) => {
      const [hasParity1, errorMessages1] = matricesHaveParity(
        apparatus.halfstepIndexMatrix.harpface1,
        apparatus.interactionMatrix.harpface1
      )
      if (
        isChromaticHarpFace(apparatus.halfstepIndexMatrix) &&
        isChromaticHarpFace(apparatus.interactionMatrix)
      ) {
        const [hasParity2, errorMessages2] = matricesHaveParity(
          apparatus.halfstepIndexMatrix.harpface2,
          apparatus.interactionMatrix.harpface2
        )
        const hasParity = hasParity1 && hasParity2
        const errorMessages = [...errorMessages1, ...errorMessages2]
        expect(hasParity).toBeTruthy()
        expect(errorMessages).toStrictEqual([])
      }
      const hasParity = hasParity1
      const errorMessages = [...errorMessages1]
      expect(hasParity).toBeTruthy()
      expect(errorMessages).toStrictEqual([])
    })
})

test('Double check that misaligned apparatus matrices *would* produce failing errors here', () => {
  const [hasParity, errorMessages] = matricesHaveParity(
    buildApparatus(TuningIds.MajorDiatonic, ValvingIds.NotValved)
      .halfstepIndexMatrix.harpface1,
    buildApparatus(TuningIds.MajorDiatonic, ValvingIds.HalfValved)
      .interactionMatrix.harpface1
  )

  expect(hasParity).toBeFalsy()
  expect(errorMessages.length).toBeGreaterThan(0)
})
