import type { WordleButton } from '@/types'

// Keyboard Rows
export const keyboardFirstRow: WordleButton[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(mapKeyboard)
export const keyboardSecondRow: WordleButton[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(mapKeyboard)
export const keyboardThirdRow: WordleButton[] = [
  { type: 'letter', display: 'Enter', action: 'submit', largeSize: true },
  ...['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(mapKeyboard),
  { type: 'letter', display: 'Del', action: 'delete', largeSize: true }
]
// 2D array of keyboard buttons
export const keyboard: WordleButton[][] = [keyboardFirstRow, keyboardSecondRow, keyboardThirdRow]
export const flatKeyboard: WordleButton[] = keyboard.flat()

function mapKeyboard(letter: string): WordleButton {
  return { type: 'letter', display: letter, action: 'type', status: 'init' }
}
