import type { WButton } from '@/types'

const _1stRow: WButton[] = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P'
].map((letter) => initWButton(letter, 'type', false, '1st'))

const _2ndRow: WButton[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(
  (letter) => initWButton(letter, 'type', false, '2nd')
)

const _3rdRow: WButton[] = [
  ...['Enter'].map((letter) => initWButton(letter, 'submit', true, '3rd')),
  ...['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) =>
    initWButton(letter, 'type', false, '3rd')
  ),
  ...['Del'].map((letter) => initWButton(letter, 'delete', true, '3rd'))
]

function initWButton(
  letter: string,
  action: WButton['action'],
  largeSize: WButton['largeSize'],
  row: WButton['row']
): WButton {
  return {
    type: 'letter',
    value: letter,
    action: action,
    status: 'init',
    largeSize: largeSize || false,
    row: row
  }
}

/**
 * Keyboard rows
 * @Example:
 * "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"
 *   "A", "S", "D", "F", "G", "H", "J", "K", "L"
 * "Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"
 */
const keyboardRows = {
  keyboardFirstRow: _1stRow,
  keyboardSecondRow: _2ndRow,
  keyboardThirdRow: _3rdRow
}

export const { keyboardFirstRow, keyboardSecondRow, keyboardThirdRow } =
  keyboardRows

/**
 * All keyboard buttons
 */
export const keyboardButtons: WButton[] = [_1stRow, _2ndRow, _3rdRow].flat()
