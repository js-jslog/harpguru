import { toQR } from 'toqr'

// One unbroken stretch of dark modules in a row of a QR code
export type QrRun = {
  readonly row: number
  readonly start: number
  readonly length: number
}

export type QrRuns = {
  // Modules along each side, without the quiet zone
  readonly size: number
  readonly runs: ReadonlyArray<QrRun>
}

// A QR code as the dark runs of each row, so it can be drawn as one view per
// run rather than one per module: a few hundred views for a setup link
// rather than well over a thousand.
export const getQrRuns = (content: string): QrRuns => {
  const modules = toQR(content)
  const size = Math.round(Math.sqrt(modules.length))
  const runs: QrRun[] = []
  for (let row = 0; row < size; row++) {
    let start = -1
    for (let column = 0; column <= size; column++) {
      const isDark = column < size && modules[row * size + column] === 1
      if (isDark && start === -1) start = column
      if (!isDark && start !== -1) {
        runs.push({ row, start, length: column - start })
        start = -1
      }
    }
  }
  return { size, runs }
}
