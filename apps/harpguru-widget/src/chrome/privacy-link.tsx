import React from 'react'
import type { ReactElement } from 'react'
import { privacyNoticeUrl } from 'harpguru-core/standalone'

import { colors, linkStyle } from './styles'

// The site's privacy notice, from every page and embed: their views are
// logged, and the ICO expects people to be pointed to the notice, not just
// able to find it
export const PrivacyLink = ({
  fontSize = 13,
  opensNewTab = false,
}: {
  readonly fontSize?: number
  readonly opensNewTab?: boolean
}): ReactElement => (
  <a
    href={privacyNoticeUrl}
    {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    style={{
      ...linkStyle,
      color: colors.quiet,
      fontSize,
      textDecoration: 'underline',
    }}
  >
    Privacy
  </a>
)
