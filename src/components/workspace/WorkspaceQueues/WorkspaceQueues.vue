<script lang="ts" setup>
import TheSpinner from "@/components/TheSpinner.vue";
import { computed, defineProps, ref } from "vue";
import { useWorkspaceStore } from "@/stores/workspace";
import WorkspaceQueueList from "./WorkspaceQueueList.vue";
import WorkspaceQueueCreationModal from "@/components/workspace/WorkspaceQueues/WorkspaceQueueCreationModal.vue";

const props = withDefaults(defineProps<{canEdit: boolean}>(), {
  canEdit: false,
});

const store = useWorkspaceStore();
const queues = computed(() => store.workspaceData?.queues);
const workspace = computed(() => store.workspaceData);

const isLoading = ref(false);
</script>

<template>
  <WorkspaceQueueCreationModal :workspace-id="workspace.id"/>
  <section class="workspace-section tasks-section">
    <div class="workspace-section__header" style="margin-bottom: 0">
      <h1 class="title-semi-32">Workspace queues</h1>
      <b-button
        variant="light"
        class="workspace-section__header_btn title-regular-28"
        v-b-modal="'queue-creation-modal'"
        v-if="props.canEdit"
      >
        <i class="bi bi-plus-circle-fill"></i>
      </b-button>
    </div>

    <TheSpinner v-if="isLoading"/>
    <template v-if="queues?.length">
      <WorkspaceQueueList :can-edit="props.canEdit" :queues="queues"/>
    </template>
    <template v-else>
      <div class="workspace-section__empty-container">
        <i class="bi bi-inbox"></i>
      </div>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.workspace-section {
  &__empty-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 400px;
    font-size: 64px;
  }
}
</style>
