import { isMatchedColumnBounds } from '../../../../utils'

export const setFromSourceColumnBounds = (
  newSourceColumnBounds: 'FIT' | readonly [number, number],
  prevColumnBounds: 'FIT' | readonly [number, number],
  setColumnBounds: (arg0: 'FIT' | readonly [number, number]) => void
): 'FIT' | readonly [number, number] => {
  if (isMatchedColumnBounds(newSourceColumnBounds, prevColumnBounds))
    return prevColumnBounds
  setColumnBounds(newSourceColumnBounds)
  return newSourceColumnBounds
}
