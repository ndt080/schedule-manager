<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { useWorkspaceStore } from "@/stores/workspace";
import { useUserStore } from "@/stores/user";
import { useNavbarStore } from "@/stores/navbar";
import { useRoute, useRouter } from "vue-router";
import { RouterPaths } from "@/core/consts/router-paths";
import { WorkspaceMemberStatus } from "@/core/consts/workspace-member-status";
import NotificationService from "@/services/notifications/notification.service";

import TheSpinner from "@/components/TheSpinner.vue";

const WorkspaceSchedules = defineAsyncComponent({
  loader: () => import("@/components/workspace/WorkspaceSchedules.vue"),
  loadingComponent: TheSpinner,
});
const WorkspaceQueues = defineAsyncComponent({
  loader: () => import("@/components/workspace/WorkspaceQueues/WorkspaceQueues.vue"),
  loadingComponent: TheSpinner,
});
const WorkspaceTasks = defineAsyncComponent({
  loader: () => import("@/components/workspace/WorkspaceTasks/WorkspaceTasks.vue"),
  loadingComponent: TheSpinner,
});
const WorkspaceSettings = defineAsyncComponent({
  loader: () => import("@/components/workspace/WorkspaceSettings.vue"),
  loadingComponent: TheSpinner,
});


const isLoading = ref(true);
const store = useWorkspaceStore();
const navbar = useNavbarStore();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const id = computed(() => Number(route.params.id));
const workspace = computed(() => store.workspace);
const canEdit = ref(false);

onMounted(async () => {
  navbar.setVisibility(false);
  isLoading.value = true;
  await getWorkspace();

  const uid = userStore.currentUser.id;
  const status = workspace.value?.members?.find((data) => data?.member?.id == uid)?.status;
  if(!status) {
    await router.push(`/${RouterPaths.HOME}`);
  }

  if (status == WorkspaceMemberStatus.OWNER || status == WorkspaceMemberStatus.EDITOR) {
    canEdit.value = true;
  }
  isLoading.value = false;
});

async function getWorkspace() {
  if (id) {
    await store.getWorkspace(id.value)
      .catch((err) => {
        NotificationService.error(err.toString());
        router.push(`/${RouterPaths.NOT_FOUND}`);
      });
  } else {
    await router.push(`/${RouterPaths.NOT_FOUND}`);
  }
}
</script>

<template>
  <TheSpinner v-if="isLoading" />
  <main class="page page--workspace" v-else>
    <b-tabs pills lazy>
      <b-tab>
        <template #title><i class="bi bi-person-workspace"></i> Schedule</template>
        <WorkspaceSchedules :can-edit="canEdit" />
      </b-tab>

      <b-tab>
        <template #title><i class="bi bi-list-task"></i> Tasks</template>
        <WorkspaceTasks :can-edit="canEdit" />
      </b-tab>

      <b-tab>
        <template #title><i class="bi bi-people-fill"></i> Queues</template>
        <WorkspaceQueues :can-edit="canEdit" />
      </b-tab>

      <b-tab>
        <template #title><i class="bi bi-gear-fill"></i> Settings</template>
        <WorkspaceSettings :can-edit="canEdit" />
      </b-tab>
    </b-tabs>
  </main>
</template>

<style lang="scss">
.page.page--workspace {
  .tabs {
    .nav-pills {
      background-color: $second-bg-color;
      border-radius: 16px;
    }

    .nav-pills .nav-link,
    .nav-pills .show > .nav-link {
      color: #0a0a0a;
      border-radius: 16px;
      background-color: $second-bg-color !important;
      transition: background-color .5s ease-in-out, color .5s ease-in-out;
    }

    .nav-pills .nav-link.active,
    .nav-pills .show > .nav-link {
      background-color: $main-color !important;
      border-radius: 16px;
      color: #ffffff;
    }
  }
}
</style>
