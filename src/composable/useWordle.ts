import type { ComputedRef, Ref } from 'vue'
import { computed, readonly, ref } from 'vue'
import type {
  WordleCellLetter,
  WordleResult,
  WordleButton,
  BaseWordleToken,
  WordleResultStatus
} from '@/types'

export default function () {
  return {
    typing,
    submit,
    undo,
    gameResult: readonly(gameResult),
    keyboardVisited: readonly(keyboardVisited),
    keyboardTyping: readonly(keyboardTyping),
    wordBoard5x5: readonly(wordBoard5x5)
  }
}

/**
 * Game board
 */
const gameResult: Ref<WordleResultStatus> = ref('start')
const wordBoard5x5: Ref<WordleCellLetter[][]> = ref(initWordBoard5x5()) // Init default Tiles
const wordBoardTyping: Ref<WordleCellLetter[]> = computed(() =>
  typingLetters.value.map((t) => ({ ...t }))
)
/**
 * Keyboard
 */
const keyboardVisited: Ref<WordleButton[]> = ref([])
const keyboardTyping: ComputedRef<WordleButton[]> = computed(() =>
  typingLetters.value.map((t) => ({
    ...t,
    type: 'letter',
    action: 'type'
  }))
)
/**
 * Game temp states
 */
const turn: Ref<number> = ref(1)
const typingLetters: Ref<BaseWordleToken[]> = ref([])
/**
 * User choose a letter
 * @param keyboardToken
 * @description keyboard and wordBoard should be updated
 */
function typing(keyboardToken: WordleButton) {
  if (notAllowedTyping()) return
  if (keyboardToken.action === 'type') {
    typingLetters.value.push({
      ...keyboardToken,
      status: 'typing'
    })
    // Set wordBoard
    wordBoard5x5.value[turn.value - 1] = mergeWithDefault(wordBoardTyping.value)
  }
}

/**
 * User submit word
 */
async function submit() {
  if (notAllowedSubmit()) return
  const result = await checkWord()
  typingLetters.value = result.resultWord
  // Set wordBoard
  wordBoard5x5.value[turn.value - 1] = wordBoardTyping.value
  // Set keyboard
  keyboardVisited.value = keyboardVisited.value.concat(
    result.resultWord.map((t) => ({ ...t, type: 'letter', action: 'type' }))
  )
  clearTypingWord()
  gameResult.value = result.result
  turn.value += 1
}
/**
 * User undo a letter
 * @description keyboard and wordBoard should be updated
 */
function undo() {
  if (wordBoardTyping.value.length === 0) return
  typingLetters.value.pop()
  // Set wordBoard
  wordBoard5x5.value[turn.value - 1] = mergeWithDefault(wordBoardTyping.value)
}
function notAllowedTyping() {
  return (
    gameResult.value === 'win' ||
    gameResult.value === 'lose' ||
    // Full 5 letters typing
    (wordBoardTyping.value.length === 5 &&
      wordBoardTyping.value.every((t) => t.status && t.status === 'typing'))
  )
}
function notAllowedSubmit() {
  return (
    gameResult.value === 'win' ||
    gameResult.value === 'lose' ||
    wordBoardTyping.value.length < 5
  )
}
async function checkWord(): Promise<WordleResult> {
  let wordToday = await getWordToday()
  const word = typingLetters.value.map((t) => t.display.toLowerCase()).join('')
  // Init result word. Assume all letters are absent
  let resultWord = typingLetters.value.map((t) => ({ ...t, status: 'absent' }))
  if (word === wordToday) {
    // Perfect case, match word. Set status for all letters as success
    resultWord = typingLetters.value.map((t) => ({ ...t, status: 'success' }))
  }

  // Mark some letters as Success
  resultWord = resultWord.map((item, index) => {
    const letterAtChar = wordToday.charAt(index)
    if (letterAtChar === item.display.toLowerCase()) {
      wordToday = replaceAtIndex(wordToday, index)
      return { ...item, status: 'success' }
    }
    return item
  })

  // Mark some letters as Present
  resultWord = resultWord.map((item) => {
    const indexInAnswer = wordToday.indexOf(item.display.toLowerCase())
    if (indexInAnswer > -1 && item.status !== 'success') {
      wordToday = replaceAtIndex(wordToday, indexInAnswer)
      return { ...item, status: 'present' }
    }
    return item
  })

  const isWin = resultWord.every((t) => t.status === 'success')
  const isLose =
    turn.value === 5 && resultWord.some((t) => t.status !== 'success')

  return {
    result: (isWin && 'win') || (isLose && 'lose') || 'wrong',
    resultWord: resultWord as WordleCellLetter[]
  }
}
function replaceAtIndex(wordToday: string, index: number) {
  return wordToday.slice(0, index) + '_' + wordToday.slice(index + 1)
}
function clearTypingWord() {
  typingLetters.value = []
}
async function getWordToday() {
  const YYYY = new Date().getFullYear()
  const MM = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const DD = new Date().getDate().toString().padStart(2, '0')
  const today = `${YYYY}-${MM}-${DD}`
  const API_URL = `https://www.nytimes.com/svc/wordle/v2/${today}.json`

  // const response = await fetch(API_URL)
  // console.log(await response.json())
  return 'apple'
  // return (await response.json()).results[0].solution.toLowerCase()
}
function mergeWithDefault(array: WordleCellLetter[]) {
  const defaultArray: WordleCellLetter[] = new Array(5)
    .fill({ display: '', status: 'init' })
    .map((item) => ({ ...item, id: Math.random().toString(36).substr(2, 9) }))

  return defaultArray.map((item, index) => {
    if (array[index]) {
      return {
        ...array[index],
        id: Math.random().toString(36).substr(2, 9)
      }
    }
    return item
  })
}
function initWordBoard5x5() {
  return new Array(5)
    .fill(new Array(5).fill({ display: '', status: 'init' }))
    .map((row) =>
      row.map((item: any) => {
        return {
          ...item,
          id: Math.random().toString(36).substr(2, 9)
        }
      })
    )
}
