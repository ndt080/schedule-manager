<template>
  <b-button v-if="deferredPrompt" variant="primary" @click="install">Install</b-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const deferredPrompt = ref();

const install = async () => {
  deferredPrompt.value?.prompt();
  deferredPrompt.value = null;
};

const dismiss = async () => {
  deferredPrompt.value = null;
};
</script>

