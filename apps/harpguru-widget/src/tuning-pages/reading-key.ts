// How to read the harp face, for a newcomer. The face is drawn sideways on a
// wide screen and will stand upright on a phone, and each way reads
// differently, so each has its own key.

type KeyLine = {
  readonly lead: string
  readonly text: string
}

export type ReadingKey = {
  // One line beside the face, for a page with no room for more
  readonly short: string
  readonly full: ReadonlyArray<KeyLine>
}

export const sidewaysKey: ReadingKey = {
  short:
    'Blow notes above each hole number, draw notes below, bends further out. Filled cells are in the scale.',
  full: [
    {
      lead: 'The grey bands:',
      text: 'blow notes on top, draw notes below, hole numbers between. Gaps between the bands split the harp into its octaves.',
    },
    {
      lead: 'Above and below:',
      text: 'the notes you reach by shaping your mouth. Blow bends and overblows above, draw bends and overdraws below.',
    },
    {
      lead: 'The colours:',
      text: 'each scale degree keeps one colour in every key. Filled cells are the notes of the chosen scale.',
    },
    {
      lead: 'The left edge:',
      text: 'all twelve degrees, named the other way: notes when the cells show degrees, degrees when they show notes.',
    },
  ],
}

export const uprightKey: ReadingKey = {
  short:
    'Draw on the left of each hole, blow on the right, bends further out. Filled cells are in the scale.',
  full: [
    {
      lead: 'Each row is one hole,',
      text: 'from hole 1 at the top to the highest hole at the bottom.',
    },
    {
      lead: 'Inside the grey bands:',
      text: 'the hole number, with its draw note to the left and its blow note to the right.',
    },
    {
      lead: 'Further left:',
      text: 'the notes you reach while drawing by shaping your mouth, which are bends and overdraws.',
    },
    {
      lead: 'Further right:',
      text: 'the same while blowing, which are bends and overblows.',
    },
    {
      lead: 'Gaps between the bands',
      text: 'split the harp into its octaves.',
    },
    {
      lead: 'Colours:',
      text: 'each scale degree keeps one colour in every key, and filled cells are in the scale. The strip above the harp lists them all.',
    },
  ],
}
