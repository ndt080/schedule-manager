<template>
  <section class="spinner__wrapper">
    <b-spinner class="spinner"></b-spinner>
  </section>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
  .spinner {
    width: 6rem;
    height: 6rem;
    border-width: 12px;

    &__wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
    }
  }
</style>
