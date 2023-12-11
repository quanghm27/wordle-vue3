import type { Ref } from 'vue'
import { computed, readonly, ref } from 'vue'
import type { WBoardLetter, WButton, WGameResult, WLetterStatus } from '@/types'

export default function () {
  return {
    typing,
    submit,
    undo,
    gameResult: readonly(gameResult),
    wordBoard5x5: readonly(wordBoard5x5),
    kbStatusMap: keyboardStatusMap,
    kbTyping: keyboardTyping
  }
}

/**
 * Game board
 */
const gameResult: Ref<WGameResult> = ref('start')
const wordBoard5x5: Ref<WBoardLetter[][]> = ref(initWordBoard5x5()) // Init default Tiles
/**
 * Keyboard
 */
const keyboardStatusMap: Ref<Map<string, WLetterStatus>> = ref(new Map())
const keyboardTyping: Ref<string[]> = ref([])
/**
 * Game temp states
 */
const turn: Ref<number> = ref(1)
const notAllowedTyping = computed(
  () =>
    gameResult.value === 'win' ||
    gameResult.value === 'lose' ||
    keyboardTyping.value.length === 5
)
const notAllowedSubmit = computed(
  () =>
    gameResult.value === 'win' ||
    gameResult.value === 'lose' ||
    keyboardTyping.value.length < 5
)
/**
 * User choose a letter
 * @param token
 * @description keyboard and wordBoard should be updated
 */
function typing(token: WButton) {
  if (notAllowedTyping.value) return
  if (token.action === 'type') {
    keyboardTyping.value.push(token.value)
    wordBoard5x5.value[turn.value - 1] = mergeWithDefault(
      keyboardTyping.value.map((t) => ({ value: t, status: 'typing' }))
    )
  }
}

/**
 * User submit word
 */
async function submit() {
  if (notAllowedSubmit.value) return
  const { result, checkedWord } = await checkWord()
  // Set keyboard status
  checkedWord.forEach((item) => {
    // Not change status of success button
    if (keyboardStatusMap.value.get(item.value) === 'success') return
    keyboardStatusMap.value.set(item.value, item.status || 'init')
  })
  // Set wordBoard
  wordBoard5x5.value[turn.value - 1] = mergeWithDefault(checkedWord)
  gameResult.value = result
  // Reset keyboard
  keyboardTyping.value = []
  turn.value += 1
}
/**
 * User undo a letter
 * @description keyboard and wordBoard should be updated
 */
function undo() {
  if (keyboardTyping.value.length === 0) return
  keyboardTyping.value.pop()
  // Set wordBoard
  wordBoard5x5.value[turn.value - 1] = mergeWithDefault(
    keyboardTyping.value.map((t) => ({ value: t, status: 'typing' }))
  )
}

async function checkWord(): Promise<{
  result: WGameResult
  checkedWord: WBoardLetter[]
}> {
  let wordToday = await getWordToday()
  const word = keyboardTyping.value.join('').toLowerCase()
  // Init result word. Assume all letters are absent
  let resultWord: WBoardLetter[] = keyboardTyping.value.map((t) => ({
    value: t,
    status: 'absent'
  }))
  if (word === wordToday) {
    // Perfect case, match word. Set status for all letters as success
    resultWord = keyboardTyping.value.map((t) => ({
      value: t,
      status: 'success'
    }))
  }

  // Mark some letters as Success
  resultWord = resultWord.map((item, index) => {
    const letterAtChar = wordToday.charAt(index)
    if (letterAtChar === item.value.toLowerCase()) {
      wordToday = replaceAtIndex(wordToday, index)
      return { ...item, status: 'success' }
    }
    return item
  })

  // Mark some letters as Present
  resultWord = resultWord.map((item) => {
    const indexInAnswer = wordToday.indexOf(item.value.toLowerCase())
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
    checkedWord: resultWord
  }
}

function replaceAtIndex(word: string, index: number) {
  return word.slice(0, index) + '_' + word.slice(index + 1)
}

async function getWordToday() {
  const YYYY = new Date().getFullYear()
  const MM = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const DD = new Date().getDate().toString().padStart(2, '0')
  const today = `${YYYY}-${MM}-${DD}`
  // const response = await fetch(API_URL)
  // console.log(await response.json())
  return 'apple'
  // return (await response.json()).results[0].solution.toLowerCase()
}

function mergeWithDefault(array: WBoardLetter[]): WBoardLetter[] {
  const defaultArray: WBoardLetter[] = new Array(5).fill({
    value: '',
    status: 'init'
  })

  return defaultArray.map((item, index) => {
    if (array[index]) {
      return {
        value: array[index].value,
        status: array[index].status || 'typing'
      }
    }
    return item
  })
}

function initWordBoard5x5() {
  return new Array(5)
    .fill(new Array(5).fill({ value: '', status: 'init' }))
    .map((row) =>
      row.map((item: any) => {
        return {
          ...item
        }
      })
    )
}
