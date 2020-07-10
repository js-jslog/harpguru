import { StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import { PitchIds } from 'harpstrata'

import type { ScreenProps } from '../types'
import { CovariantMembers } from '../../Controls'
import type { CovariancePrimer } from '../../Controls'
import { CovarianceButtonList, HeadsupDisplay } from '../../Controls'

export const ControlPanel = (props: ScreenProps): ReactElement => {
  const { activeHarpStrata, setActiveHarpStrata } = props
  const covarianceOriginPrimer: CovariancePrimer = {
    lockedType: CovariantMembers.RootPitch,
    variedType: CovariantMembers.HarpKey,
    lockedValue: PitchIds.C,
    variedValue: PitchIds.C,
  }
  const covarianceButtonListProps = {
    activeHarpStrata,
    setActiveHarpStrata,
    ...covarianceOriginPrimer,
  }

  const styles = StyleSheet.create({
    headsupdiplay: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    controls: {
      flex: 5,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  })

  return (
    <>
      <View style={styles.headsupdiplay}>
        <HeadsupDisplay {...activeHarpStrata} />
      </View>
      <View style={styles.controls}>
        <CovarianceButtonList {...covarianceButtonListProps} />
      </View>
    </>
  )
}
