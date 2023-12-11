<script setup lang="ts">
import { computed } from 'vue'
import type { WordleButton, WordleStatus } from '@/types'
interface Props {
  button: WordleButton
  status: WordleStatus
  isTyping: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(['click-a-button'])

const buttonClasses = computed(() => {
  return {
    'wordle-keyboard__button-small': !props.button.largeSize,
    'wordle-keyboard__button-large': props.button.largeSize,
    typing: props.isTyping,
    ...getStatusClass()
  }
})

function getStatusClass() {
  // Order matters
  if (props.status === 'success') return { 'bg-success': true }
  if (props.status === 'present') return { 'bg-present': true }
  if (props.status === 'absent') return { 'bg-absent': true }
  return { 'bg-init': true }
}
</script>
<template>
  <div
    v-if="button.type === 'letter'"
    class="wordle-keyboard__button bg-init"
    :class="buttonClasses"
    @click="emits('click-a-button', button)"
  >
    {{ button.display }}
  </div>
</template>
<style scoped>
.wordle-keyboard__button {
  height: 2.5em;
  line-height: 2.5em;
  border-radius: 5px;
  font-size: 1.5rem;
  text-align: center;
  margin: 0 1px;
  border: 1px solid var(--color-background);
  box-sizing: border-box;
}
.wordle-keyboard__button-small {
  width: calc(100% / 10);
}
.wordle-keyboard__button-large {
  width: calc(100% / 10 * 1.25);
}
.typing {
  border: 1px solid var(--c-ebony);
}
</style>
