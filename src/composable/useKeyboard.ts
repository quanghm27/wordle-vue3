import { computed } from 'vue'
import useKeyup from '@/composable/useKeyup'
import {
  keyboardButtons,
  keyboardSecondRow as kb2ndRow,
  keyboardFirstRow as kb1stRow,
  keyboardThirdRow as kb3rdRow
} from '@/constants/keyboard'
import useWordle from '@/composable/useWordle'
import type { WButton } from '@/types'

const { submit, undo, typing, kbStatusMap, kbTyping } = useWordle()

// Computed
const kb1stRowComputed = computed(() => kb1stRow.map(_status).map(_typing))
const kb2ndRowComputed = computed(() => kb2ndRow.map(_status).map(_typing))
const kb3rdRowComputed = computed(() => kb3rdRow.map(_status).map(_typing))

function _status<T extends WButton>(button: T): T {
  // not change status of success button
  return {
    ...button,
    status: kbStatusMap.value.get(button.value) || 'init'
  }
}

function _typing<T extends WButton>(button: T): T {
  return {
    ...button,
    isTyping: kbTyping.value.includes(button.value)
  }
}

export default function () {
  // Add event listeners
  useKeyup([
    ...keyboardButtons
      .filter((x) => x.action === 'type')
      .map((x) => ({ key: x.value, action: () => typing(x) })),
    { key: 'Enter', action: submit },
    { key: 'Backspace', action: undo }
  ])

  return {
    firstRow: kb1stRowComputed,
    secondRow: kb2ndRowComputed,
    thirdRow: kb3rdRowComputed
  }
}
