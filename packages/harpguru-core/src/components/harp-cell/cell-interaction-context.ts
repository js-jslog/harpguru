import { createContext } from 'react'

// Whether tapping a cell toggles it. The app always allows it; a standalone
// harp face showing a tuning page turns it off, because configuration and cell
// interaction never share a page.
export const CellInteractionContext = createContext(true)
