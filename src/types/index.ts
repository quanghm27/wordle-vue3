export type WordleStatus = 'success' | 'present' | 'absent' | 'typing' | 'init'

export interface BaseWordleToken {
  display: string
  status?: WordleStatus
}

/**
 * Keyboard button
 */
export interface WordleButton extends BaseWordleToken {
  action: 'type' | 'delete' | 'submit'
  type: 'letter' | 'icon'
  largeSize?: boolean
}

/**
 * Game board
 */
export interface WordleCellLetter extends BaseWordleToken {}
export type WordleResultStatus = 'win' | 'wrong' | 'lose' | 'start'
export interface WordleResult {
  result: WordleResultStatus
  resultWord: WordleCellLetter[]
}
