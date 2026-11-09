// jsdom has no matchMedia, and Reanimated asks it about reduced motion as soon
// as it is imported
window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  }))
