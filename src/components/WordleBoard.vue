<script setup lang="ts">
import useWordle from '@/composable/useWordle'
import WordleCell from '@/components/WordleCell.vue'
import { computed } from 'vue'

const { wordBoard5x5, gameResult } = useWordle()
const gameEnd = computed(() => ['win', 'lose'].includes(gameResult.value))
</script>

<template>
  <div class="wordle-board relative">
    <div
      v-for="(word, index) in wordBoard5x5"
      :key="index"
      class="wordle-board__row"
    >
      <WordleCell
        v-for="(letter, index2) in word"
        :key="index + '__' + index2"
        :letter="letter"
      />
    </div>
    <div v-show="gameEnd" class="layer" />
    <div v-show="gameEnd" class="game-result absolute">
      {{ gameResult }}
    </div>
  </div>
</template>

<style scoped>
.wordle-board__row {
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background: var(--color-background);
}
.game-result {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  top: calc(50% - 4rem);
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  color: var(--c-ebony);
  animation: 2s anim-flipX ease infinite;
}

@keyframes anim-flipX {
  0% {
    opacity: 0;
    transform: rotateX(90deg);
  }
  50% {
    opacity: 1;
    transform: rotateX(720deg);
  }
  100% {
    /* animate nothing to pause animation at the end */
    opacity: 1;
    transform: rotateX(720deg);
  }
}
</style>
