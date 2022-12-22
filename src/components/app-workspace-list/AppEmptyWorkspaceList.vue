<template>
  <div class="container">
    <i class="container__icon bi-inbox"></i>
    <div>Missing content</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;

  font-size: 20px;

  &__icon {
    font-size: 60px;
  }
}
</style>
