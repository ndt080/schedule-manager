<template>
  <div class="page">
    <Vue3Lottie class="lottie" :animationData="NotFoundJSON" />
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import NotFoundJSON from "@/assets/animation/not_found.json";
</script>

<style lang="scss">
@media (max-width: 850px) {
  .layout {
    &__main {
      min-height: 85vh !important;
      margin: 0 !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .lottie {
    width: 40%;
  }
}

@media (max-width: 850px) {
  .page .lottie {
    width: 100% !important;
    max-height: 100% !important;
  }
}
</style>
