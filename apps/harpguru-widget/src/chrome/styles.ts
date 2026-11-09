import { StyleSheet } from 'react-native'

export const colors = {
  page: '#fefefe',
  text: '#222222',
  quiet: '#666666',
  accent: '#7a3e78',
  rule: '#e4e4e4',
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
