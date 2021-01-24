// TODO: this function is known to be flakey and needs to be replaced
// as soon as the styling of the menu options has settled. It's only
// intended as as stop gap. The solution ultimately is to be returning
// pozition and pitch objects rather than just their id's and those
// objects can define their own core and suffixes.
export const splitSuffixFromPitchOrPozition = (
  label: string
): [string, string] => {
  // Natural pitches
  if (label.length === 1) return [label, '']
  // Flat pitches
  if (label.length === 2) return [label[0], label[1]]
  // Pozitions
  return [label.slice(0, -2), label.slice(-2)]
}
