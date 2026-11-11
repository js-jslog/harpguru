// Whether a harp face stands upright: on a narrow screen held upright, where
// sideways a 10-hole face is too small to read. A tablet held upright is
// wide enough for the sideways face.
export const uprightBelowWidth = 700

export const isUprightWindow = (width: number, height: number): boolean =>
  width < uprightBelowWidth && height > width
