import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { PitchIds, ValvingIds } from 'harpparts'
import type { TuningIds } from 'harpparts'
import { StandaloneHarpFace } from 'harpguru-core/standalone'
import { getCovariantSet } from 'harpcovariance'

import { readTuningQuery, writeTuningQuery } from '../tuning-pages/tuning-query'
import type { TuningView } from '../tuning-pages/tuning-query'
import { sidewaysKey } from '../tuning-pages/reading-key'
import type { ReadingKey } from '../tuning-pages/reading-key'
import { getPresets, getTuningDescription } from '../tuning-pages/presets'
import type { Preset } from '../tuning-pages/presets'
import { describeHomeHoles, getHomeHoles } from '../tuning-pages/home-holes'
import { describeHarp } from '../describe-setup'
import { colors, chromeStyles } from '../chrome/styles'
import { StoreLinks } from '../chrome/store-links'
import { SimpleNote } from '../chrome/simple-note'
import { Choice } from '../chrome/choice'
import { Brand } from '../chrome/brand'
import { correctAddress } from '../address'

type TuningPageProps = {
  readonly tuningId: TuningIds
}

// Below this width the guide stacks into one scrolling column: beside the
// sidebar, a narrower harp face is too small to read
const wideWidth = 1100

const { C: harpKeyId } = PitchIds

const getSongKey = ({ pozitionId }: Preset): PitchIds =>
  getCovariantSet({ harpKeyId, pozitionId }).rootPitchId

// /t/<tuning>: a field guide to one tuning. What the tuning is, the pozitions
// it is built for and what each is for, where home is on the harp, and how to
// read the harp face, around a C harp showing the chosen preset. Cells don't
// toggle, because configuration and cell interaction never share a page.
export const TuningPage = ({ tuningId }: TuningPageProps): ReactElement => {
  const { width } = useWindowDimensions()
  const [view, setView] = useState<TuningView>(() =>
    readTuningQuery(tuningId, window.location.search)
  )
  const harpStrataProps = {
    tuningId,
    valvingId: ValvingIds.NotValved,
    pozitionId: view.preset.pozitionId,
    harpKeyId,
    activeIds: view.preset.degrees,
  }

  useEffect(() => {
    correctAddress(writeTuningQuery(view))
  }, [view])

  const guide: GuideProps = {
    tuningId,
    view,
    setView,
    harpFace: (
      <StandaloneHarpFace
        setup={{ harpStrataProps, displayMode: view.displayMode }}
        isInteractive={false}
      />
    ),
    harp: describeHarp(harpStrataProps, { withTuning: false }),
    home: describeHomeHoles(getHomeHoles(tuningId, view.preset.pozitionId)),
    readingKey: sidewaysKey,
  }

  return width >= wideWidth ? (
    <WideGuide {...guide} />
  ) : (
    <NarrowGuide {...guide} width={width} />
  )
}

type GuideProps = {
  readonly tuningId: TuningIds
  readonly view: TuningView
  readonly setView: (view: TuningView) => void
  readonly harpFace: ReactElement
  // 'Harp key C · 2nd position · Song key G'
  readonly harp: string
  // 'draw 2, blow 3, 6 and 9'
  readonly home: string
  readonly readingKey: ReadingKey
}

// A sidebar that explains, beside a harp face that fills the rest
const WideGuide = ({
  tuningId,
  view,
  setView,
  harpFace,
  harp,
  home,
  readingKey,
}: GuideProps): ReactElement => (
  <View style={chromeStyles.page}>
    <View style={[chromeStyles.bar, styles.wideBar]}>
      <Brand />
      <View style={styles.barEnd}>
        <SimpleNote />
        <StoreLinks />
      </View>
    </View>
    <View style={styles.wideBody}>
      <ScrollView
        style={styles.aside}
        contentContainerStyle={styles.asideContent}
      >
        <View style={styles.intro}>
          <Text role="heading" aria-level={1} style={styles.wideTitle}>
            {tuningId}
          </Text>
          <Text style={styles.description}>
            {getTuningDescription(tuningId)}
          </Text>
        </View>
        <View style={styles.section}>
          <SectionHeading>Play it in</SectionHeading>
          {getPresets(tuningId).map((preset) => (
            <Choice
              key={preset.pozitionId}
              isChosen={preset.pozitionId === view.preset.pozitionId}
              onPress={() => setView({ ...view, preset })}
              style={styles.presetCard}
            >
              <View style={styles.presetCardTop}>
                <Text style={styles.presetName}>
                  {preset.pozitionId} position · {preset.scaleLabel}
                </Text>
                <Text style={[styles.quietText, styles.noShrink]}>
                  song key {getSongKey(preset)}
                </Text>
              </View>
              <Text style={styles.presetText}>{preset.description}</Text>
            </Choice>
          ))}
        </View>
      </ScrollView>
      <View style={styles.main}>
        <View style={styles.status}>
          <Text style={styles.statusText}>
            {harp} · <Text style={styles.strong}>Home:</Text> {home}
          </Text>
          <DisplayChoices view={view} setView={setView} />
        </View>
        <View style={chromeStyles.harpFace}>{harpFace}</View>
        <View style={styles.keyGrid}>
          {readingKey.full.map(({ lead, text }) => (
            <Text key={lead} style={[styles.keyText, styles.keyColumn]}>
              <Text style={styles.strong}>{lead}</Text> {text}
            </Text>
          ))}
        </View>
      </View>
    </View>
  </View>
)

// One scrolling column, the harp face given a box of its own
const NarrowGuide = ({
  tuningId,
  view,
  setView,
  harpFace,
  home,
  readingKey,
  width,
}: GuideProps & { readonly width: number }): ReactElement => {
  const [isKeyOpen, setIsKeyOpen] = useState(false)
  const faceHeight = Math.round((width - 32) * 0.6)
  return (
    <ScrollView style={chromeStyles.page}>
      <View style={chromeStyles.bar}>
        <Brand />
        <StoreLinks />
      </View>
      <View style={styles.narrowBody}>
        <Text role="heading" aria-level={1} style={styles.narrowTitle}>
          {tuningId}
        </Text>
        <Text style={styles.description}>{getTuningDescription(tuningId)}</Text>
        <View style={styles.section}>
          <SectionHeading>Play it in</SectionHeading>
          <View style={styles.presetGrid}>
            {getPresets(tuningId).map((preset) => (
              <Choice
                key={preset.pozitionId}
                isChosen={preset.pozitionId === view.preset.pozitionId}
                onPress={() => setView({ ...view, preset })}
                style={styles.presetTile}
              >
                <Text style={styles.presetTileName}>{preset.pozitionId}</Text>
                <Text style={styles.presetTileScale}>{preset.scaleLabel}</Text>
              </Choice>
            ))}
          </View>
          <Text style={styles.presetText}>{view.preset.description}</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>
            Song key{' '}
            <Text style={styles.strong}>{getSongKey(view.preset)}</Text> on a C
            harp
          </Text>
          <DisplayChoices view={view} setView={setView} />
        </View>
        <Text style={styles.statusText}>
          <Text style={styles.strong}>Home:</Text> {home}
        </Text>
        <Text style={styles.shortKey}>{readingKey.short}</Text>
        <View style={{ height: faceHeight }}>{harpFace}</View>
        <View style={styles.keyFold}>
          <Pressable
            onPress={() => setIsKeyOpen(!isKeyOpen)}
            accessibilityRole="button"
            accessibilityState={{ expanded: isKeyOpen }}
            style={styles.keyToggle}
          >
            <Text style={styles.sectionHeading}>How to read the harp</Text>
            <Text style={styles.quietText}>{isKeyOpen ? '−' : '+'}</Text>
          </Pressable>
          {isKeyOpen &&
            readingKey.full.map(({ lead, text }) => (
              <Text key={lead} style={styles.keyText}>
                <Text style={styles.strong}>{lead}</Text> {text}
              </Text>
            ))}
        </View>
        <SimpleNote style={styles.centred} />
      </View>
    </ScrollView>
  )
}

const SectionHeading = ({
  children,
}: {
  readonly children: string
}): ReactElement => (
  <Text role="heading" aria-level={2} style={styles.sectionHeading}>
    {children}
  </Text>
)

const DisplayChoices = ({
  view,
  setView,
}: Pick<GuideProps, 'view' | 'setView'>): ReactElement => (
  <View style={styles.displayChoices}>
    {(
      [
        ['degree', 'Degrees'],
        ['pitch', 'Pitches'],
      ] as const
    ).map(([displayMode, label]) => {
      const isChosen = view.displayMode === displayMode
      return (
        <Choice
          key={displayMode}
          isChosen={isChosen}
          onPress={() => setView({ ...view, displayMode })}
          style={styles.displayChoice}
        >
          <Text style={[styles.choiceText, isChosen && styles.strong]}>
            {label}
          </Text>
        </Choice>
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  wideBar: {
    paddingHorizontal: 40,
  },
  barEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wideBody: {
    flex: 1,
    flexDirection: 'row',
    gap: 40,
    paddingHorizontal: 40,
    paddingVertical: 28,
    minHeight: 0,
  },
  aside: {
    width: 360,
    flexGrow: 0,
    flexShrink: 0,
  },
  asideContent: {
    gap: 20,
  },
  intro: {
    gap: 8,
  },
  wideTitle: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 37,
    fontWeight: '600',
  },
  narrowTitle: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 29,
    fontWeight: '600',
  },
  description: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    gap: 8,
  },
  sectionHeading: {
    color: colors.quiet,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  presetCard: {
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
  },
  presetCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 8,
  },
  presetName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },
  presetText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  presetTile: {
    flexGrow: 1,
    flexBasis: 100,
    maxWidth: 200,
    gap: 2,
    padding: 10,
    borderRadius: 8,
  },
  presetTileName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  presetTileScale: {
    color: colors.text,
    fontSize: 12,
  },
  main: {
    flex: 1,
    minWidth: 0,
    gap: 16,
  },
  status: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  statusText: {
    color: colors.text,
    fontSize: 15,
    flexShrink: 1,
  },
  strong: {
    fontWeight: '600',
  },
  quietText: {
    color: colors.quiet,
    fontSize: 13,
  },
  noShrink: {
    flexShrink: 0,
  },
  displayChoices: {
    flexDirection: 'row',
    gap: 6,
  },
  displayChoice: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  choiceText: {
    color: colors.text,
    fontSize: 14,
  },
  keyGrid: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.rule,
  },
  keyColumn: {
    flex: 1,
  },
  keyText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  narrowBody: {
    gap: 14,
    padding: 16,
  },
  shortKey: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  keyFold: {
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.rule,
  },
  keyToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 44,
  },
  centred: {
    textAlign: 'center',
  },
})
