// export type WordleStatus = 'success' | 'present' | 'absent' | 'typing' | 'init'
//
// export interface BaseWordleToken {
//   display: string
//   status?: WordleStatus
// }
//
// /**
//  * Keyboard button
//  */
// export interface WordleButton extends BaseWordleToken {
//   action: 'type' | 'delete' | 'submit'
//   type: 'letter' | 'icon'
//   largeSize?: boolean
// }
//
// /**
//  * Game board
//  */
// export interface WordleCellLetter extends BaseWordleToken {}
// export type WordleResultStatus = 'win' | 'wrong' | 'lose' | 'start'
// export interface WordleResult {
//   result: WordleResultStatus
//   resultWord: WordleCellLetter[]
// }

/**
 * Base Wordle Token
 */
export type WLetterStatus = 'success' | 'present' | 'absent' | 'typing' | 'init'
export interface WLetter {
  value: string
  status?: WLetterStatus
}

/**
 * Single keyboard button
 */
export interface WButton extends WLetter {
  action: 'type' | 'delete' | 'submit'
  type: 'letter' | 'icon'
  largeSize?: boolean
  isTyping?: boolean
  row: '1st' | '2nd' | '3rd'
}

/**
 * Single letter on the board
 */
export interface WBoardLetter extends WLetter {}

/**
 * Game result
 */
export type WGameResult = 'win' | 'wrong' | 'lose' | 'start'
