<template>
  <div class="layout" v-if="!isLoading">
    <AppHeader />
    <WorkspaceCreateModal />
    <div class="layout__wrapper">
      <TheNavigationBar />
      <main class="layout__main">
        <router-view />
      </main>
    </div>
  </div>
  <TheLoader v-else></TheLoader>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useWorkspaceStore } from "@/stores/workspace";

import TheLoader from "@/components/TheLoader.vue";
import WorkspaceCreateModal from "@/components/workspace-create-modal/WorkspaceCreateModal.vue";
import AppHeader from "@/components/app-header/AppHeader.vue";
import TheNavigationBar from "@/components/TheNavigationBar.vue";

const userStore = useUserStore();
const workspaceStore = useWorkspaceStore();
const isLoading = ref(true);

onMounted(async () => {
  await userStore.getCurrentUser();
  await workspaceStore.getUserWorkspaces();
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.layout {
  &__wrapper {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: auto 1fr;
    padding: 0 10px 10px 10px;
  }

  &__main {
    box-sizing: border-box;
    background: $light-bg;
    border-radius: 2rem;
    width: 100%;
    min-height: calc(100vh - 85px);
    padding: 20px;
  }
}

@media (max-width: 850px) {
  .layout {
    &__main {
      min-height: 100vh;
      margin-bottom: 60px;
    }
  }
}
</style>
