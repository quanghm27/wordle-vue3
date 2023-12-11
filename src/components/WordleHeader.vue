<template>
  <div class="wordle-header">
    <div class="wordle-header__icon-left">
      <!--      <img src='../assets/logo.svg' alt='logo' />-->
    </div>
    <div class="wordle-header__title">WORDLE</div>
    <div class="wordle-header__icon-right">
      <!--      <img src='../assets/logo.svg' alt='logo' />-->
    </div>
  </div>
</template>

<style scoped>
.wordle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  line-height: 4rem;
  border-bottom: 1px solid #eaeaea;
}
.wordle-header__title {
  font-size: 4rem;
  color: var(--color-text-keyboard);
}
</style>
