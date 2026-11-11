import {
  View,
  Text,
  Pressable,
  ScrollView,
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import type { SetupDisplayMode } from 'harpstrata'
import { getTuningSlug } from 'harpparts'
import type { TuningIds } from 'harpparts'

import { colors, linkStyle } from '../chrome/styles'

import { getTuningGroups } from './presets'

type TuningDrawerProps = {
  readonly currentTuningId: TuningIds
  // Carried to the next tuning, so pitches stay pitches
  readonly displayMode: SetupDisplayMode
  // From the left beside a wide page, up from the bottom on a narrow one
  readonly side: 'left' | 'bottom'
  readonly isOpen: boolean
  readonly onClose: () => void
}

const drawerWidth = 340

// Every tuning with a page, as links. Choosing one loads its page, which
// closes the drawer, keeps every tuning page its own document for crawlers,
// and leaves back and new tabs working as they do anywhere.
export const TuningDrawer = ({
  currentTuningId,
  displayMode,
  side,
  isOpen,
  onClose,
}: TuningDrawerProps): ReactElement | null => {
  const { current: progress } = useRef(new Animated.Value(0))
  // The sheet is never taller than the window, so starting a window's height
  // down keeps it out of sight
  const { height: windowHeight } = useWindowDimensions()
  const [isShown, setIsShown] = useState(isOpen)

  useEffect(() => {
    if (isOpen) setIsShown(true)
    Animated.timing(progress, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !isOpen) setIsShown(false)
    })
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  if (!isShown) return null

  const slide =
    side === 'left'
      ? {
        transform: [
          {
            translateX: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-drawerWidth, 0],
            }),
          },
        ],
      }
      : {
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [windowHeight, 0],
            }),
          },
        ],
      }
  const query = displayMode === 'pitch' ? '?m=pitch' : ''

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.scrim, { opacity: progress }]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Close tunings"
        />
      </Animated.View>
      <Animated.View
        role="dialog"
        aria-modal
        aria-label="Tunings"
        style={[side === 'left' ? styles.left : styles.bottom, slide]}
      >
        {side === 'bottom' && <View style={styles.handle} />}
        <View style={styles.header}>
          <Text role="heading" aria-level={2} style={styles.title}>
            Tunings
          </Text>
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={styles.close}
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.list}>
          {getTuningGroups().map(({ category, tuningIds }) => (
            <View key={category} style={styles.group}>
              <Text role="heading" aria-level={3} style={styles.groupName}>
                {category}
              </Text>
              {tuningIds.map((tuningId) => {
                const isCurrent = tuningId === currentTuningId
                return (
                  <a
                    key={tuningId}
                    href={`/t/${getTuningSlug(tuningId)}${query}`}
                    aria-current={isCurrent ? 'page' : undefined}
                    style={{
                      ...linkStyle,
                      ...entryStyle,
                      ...(isCurrent ? currentEntryStyle : {}),
                    }}
                  >
                    {tuningId}
                  </a>
                )
              })}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  )
}

const entryStyle = {
  display: 'block',
  color: colors.text,
  fontSize: 16,
  padding: '10px',
  borderRadius: 6,
  border: '2px solid transparent',
} as const

const currentEntryStyle = {
  fontWeight: 600,
  backgroundColor: colors.chosen,
  borderColor: colors.quiet,
} as const

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(34, 34, 34, 0.35)',
  },
  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: drawerWidth,
    maxWidth: '85%',
    backgroundColor: colors.page,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '75%',
    backgroundColor: colors.page,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    marginTop: 8,
    borderRadius: 2,
    backgroundColor: colors.rule,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  close: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.text,
    fontSize: 18,
  },
  list: {
    gap: 14,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  group: {
    gap: 2,
  },
  groupName: {
    color: colors.quiet,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
})
