<script setup lang="ts">
import { computed } from 'vue'
import {
  flatKeyboard,
  keyboardFirstRow,
  keyboardSecondRow,
  keyboardThirdRow
} from '@/constants/keyboard'
import useWordle from '@/composable/useWordle'
import useKeyup from '@/composable/useKeyup'
import KeyboardButton from '@/components/KeyboardButton.vue'
import type { WordleButton, WordleStatus } from '@/types'

const { typing, submit, undo, keyboardTyping, keyboardVisited } = useWordle()
// Add event listeners
useKeyup([
  ...flatKeyboard
    .filter((x) => x.action === 'type')
    .map((x) => ({ key: x.display, action: () => typing(x) })),
  { key: 'Enter', action: submit },
  { key: 'Backspace', action: undo }
])

// Computed
const computedKeyboardFirstRow = computed(() => keyboardFirstRow.map(addStatus))
const computedKeyboardSecondRow = computed(() =>
  keyboardSecondRow.map(addStatus)
)
const computedKeyboardThirdRow = computed(() => keyboardThirdRow.map(addStatus))

function addStatus(button: WordleButton) {
  const typingStatus = keyboardTyping.value.find(
    (k) => k.display === button.display
  )
  // Order matters
  const visitedStatus =
    getStatus(button, 'success') ||
    getStatus(button, 'present') ||
    getStatus(button, 'absent')

  return {
    ...button,
    status: visitedStatus || 'init',
    isTyping: typingStatus?.status === 'typing'
  }
}
function getStatus(button: WordleButton, status: WordleStatus) {
  const check = keyboardVisited.value.some(
    (k) => k.display === button.display && k.status === status
  )
  return check && status
}

// Methods
function handleClick(button: WordleButton) {
  if (button.action === 'submit') return submit()
  if (button.action === 'delete') return undo()
  typing(button)
}
</script>

<template>
  <div class="wordle-keyboard">
    <div class="wordle-keyboard__row">
      <KeyboardButton
        v-for="(button, index2) in computedKeyboardFirstRow"
        :key="index2 + '__' + button.display"
        :button="button"
        :status="button.status"
        :is-typing="button.isTyping"
        @click-a-button="handleClick"
      />
    </div>
    <div class="wordle-keyboard__row">
      <KeyboardButton
        v-for="(button, index2) in computedKeyboardSecondRow"
        :key="index2 + '__' + button.display"
        :button="button"
        :status="button.status"
        :is-typing="button.isTyping"
        @click-a-button="handleClick"
      />
    </div>
    <div class="wordle-keyboard__row">
      <KeyboardButton
        v-for="(button, index2) in computedKeyboardThirdRow"
        :key="index2 + '__' + button.display"
        :button="button"
        :status="button.status"
        :is-typing="button.isTyping"
        @click-a-button="handleClick"
      />
    </div>
  </div>
</template>

<style scoped>
.wordle-keyboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3px;
}

.wordle-keyboard__row {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
}
</style>
