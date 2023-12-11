<script setup lang="ts">
import Header from '@/components/WordleHeader.vue'
import WordBoard from '@/components/WordleBoard.vue'
import KeyBoard from '@/components/WordleKeyboard.vue'
</script>

<template>
  <div class="relative h-100vh pt-1">
    <Header class="mb-3" />
    <WordBoard />
    <KeyBoard class="absolute w-full bottom-1" />
  </div>
</template>

<style scoped></style>
