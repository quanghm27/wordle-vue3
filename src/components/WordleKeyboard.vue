<script setup lang="ts">
import type { WButton } from '@/types'
import useWordle from '@/composable/useWordle'
import useKeyboard from '@/composable/useKeyboard'
import KeyboardButton from '@/components/KeyboardButton.vue'

const { typing, submit, undo } = useWordle()
const { firstRow, secondRow, thirdRow } = useKeyboard()

// Handler methods
function handleClick(button: WButton) {
  if (button.action === 'submit') return submit()
  if (button.action === 'delete') return undo()
  typing(button)
}
</script>

<template>
  <div class="wordle-keyboard">
    <div class="wordle-keyboard__row">
      <KeyboardButton
        v-for="(button, index2) in firstRow"
        :key="index2 + '__' + button.value"
        :button="button"
        :is-typing="button.isTyping as boolean"
        @click-a-button="handleClick"
      />
    </div>
    <div class="wordle-keyboard__row">
      <KeyboardButton
        v-for="(button, index2) in secondRow"
        :key="index2 + '__' + button.value"
        :button="button"
        :is-typing="button.isTyping as boolean"
        @click-a-button="handleClick"
      />
    </div>
    <div class="wordle-keyboard__row">
      <KeyboardButton
        v-for="(button, index2) in thirdRow"
        :key="index2 + '__' + button.value"
        :button="button"
        :is-typing="button.isTyping as boolean"
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
