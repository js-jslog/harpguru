import { StyleSheet } from 'react-native'
import { getColors } from 'harpguru-core/standalone'

const { pageColor, homeRowsColor, inertOutline, harpguruPink, harpguruGold } =
  getColors()

// The app's palette, used as the app uses it: gold for what can be pressed,
// pink behind what is chosen. Running text has no counterpart in the app,
// which labels everything on the harp face itself.
export const colors = {
  page: pageColor,
  text: '#222222',
  quiet: inertOutline,
  rule: homeRowsColor,
  action: harpguruGold,
  chosen: harpguruPink,
} as const

// DOM links, which react-native-web's Text can't be: an <a> keeps the
// browser's own handling of new tabs and copying the address
export const linkStyle = {
  fontFamily: 'system-ui, sans-serif',
  textDecoration: 'none',
} as const

export const chromeStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.page,
  },
  bar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
  },
  heading: {
    flexShrink: 1,
    minWidth: 200,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  detail: {
    color: colors.quiet,
    fontSize: 14,
  },
  harpFace: {
    flex: 1,
  },
})
