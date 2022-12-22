<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script lang="ts" setup>
import HomeLayout from "@/layouts/HomeLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useRoute } from "vue-router";
import { computed, markRaw, onMounted, ref, watch } from "vue";
import { useAppStore } from "@/stores/app";
import { BeforeInstallPromptEvent } from "@/core/models/BeforeInstallPromptEvent";

const appStore = useAppStore();
const route = useRoute();
const layout = ref();
const layoutName = computed(() => route.meta?.layout);

watch(
  layoutName,
  async (metaLayout) => {
    let component;

    switch (metaLayout) {
      case "HomeLayout": {
        component = await import("@/layouts/HomeLayout.vue");
        break;
      }
      case "AuthLayout": {
        component = await import("@/layouts/AuthLayout.vue");
        break;
      }
      default: {
        return;
      }
    }

    layout.value = markRaw(component?.default)
  },
    { immediate: true }
)

onMounted(() => {
  window.addEventListener("beforeinstallprompt", (e) => {
    console.log("Event", e)
    e.preventDefault();
    appStore.setDeferredPrompt(e as BeforeInstallPromptEvent);
    appStore.setVisibilityInstallBtn(true);
  });
  window.addEventListener("appinstalled", () => {
    appStore.setDeferredPrompt(undefined);
  });
});

</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
</style>
