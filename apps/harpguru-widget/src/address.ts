// A page's state is its URL. When the URL held something the page couldn't
// use, or held it in a non-canonical form, the page writes back what it is
// actually showing, without a reload and without a new history entry.
export const correctAddress = (query: string): void => {
  const {
    location: { pathname, search, hash },
    history,
  } = window
  if (search.replace(/^\?/, '') === query) return
  history.replaceState(history.state, '', `${pathname}?${query}${hash}`)
}
