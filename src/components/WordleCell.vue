<script setup lang="ts">
import { computed } from 'vue'
import type { WordleCellLetter } from '@/types'

const props = defineProps<{ letter: WordleCellLetter }>()
const statusClass = computed(() => {
  // Order matters
  if (props.letter.status === 'success') return 'bg-success'
  if (props.letter.status === 'present') return 'bg-present'
  if (props.letter.status === 'absent') return 'bg-absent'
  if (props.letter.status === 'typing') return 'typing'
  return 'bg-init'
})
</script>
<template>
  <div class="wordle-cell bg-init" :class="statusClass">
    {{ letter.display }}
  </div>
</template>
<style scoped>
.wordle-cell {
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  margin: 0 0.25rem;
  font-size: 32px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid var(--color-background);
}
.typing {
  border: 1px solid var(--c-ebony);
}
</style>
