<script lang="ts" setup>
import { useWorkspaceStore } from "@/stores/workspace";
import { computed, defineProps, ref } from "vue";
import { WorkspaceTask } from "@/core/models/workspace-task";
import TheSpinner from "@/components/TheSpinner.vue";
import WorkspaceTaskCreationModal from "./WorkspaceTaskCreationModal.vue";
import WorkspaceTaskDetailsModal from "./WorkspaceTaskDetailsModal.vue";

const props = withDefaults(defineProps<{canEdit: boolean}>(), {
  canEdit: false,
});

const store = useWorkspaceStore();
const isLoading = ref(false);
const selectedTask = ref<WorkspaceTask>();
const tasks = computed((): WorkspaceTask[] => store.workspace?.tasks || []);

const onSelectTask = (task: WorkspaceTask) => (selectedTask.value = task);
</script>

<template>
  <WorkspaceTaskCreationModal v-if="props.canEdit" />
  <WorkspaceTaskDetailsModal :can-edit="props.canEdit" :task="selectedTask"/>

  <section class="workspace-section tasks-section">
    <div class="workspace-section__header">
      <h1 class="title-semi-32">Workspace tasks</h1>
      <b-button
        variant="light"
        class="workspace-section__header_btn title-regular-28"
        v-b-modal="'task-creation-modal'"
        v-if="props.canEdit"
      >
        <i class="bi bi-plus-circle-fill"></i>
      </b-button>
    </div>

    <TheSpinner v-if="isLoading"/>

    <template v-if="tasks?.length">
      <b-list-group>
        <template v-for="(task, index) of tasks" :key="index">
          <b-list-group-item
            class="tasks-section__list-item title-medium-16"
            v-b-modal="'task-details-modal'"
            @click="onSelectTask(task)"
          >
            <span class="title-semi-16">ID: </span>{{task?.id}} |
            <span class="title-semi-16">Name: </span>
            <span class="text-uppercase">{{task?.name}}</span>
          </b-list-group-item>
        </template>
      </b-list-group>
    </template>

    <template v-else>
      <div class="tasks-section__empty-container">
        <i class="bi bi-inbox"></i>
      </div>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.tasks-section {
  width: 100%;

  &__empty-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 400px;
    font-size: 64px;
  }

  &__list-item {
    border-radius: 16px;
    cursor: pointer;
    background-color: white;
    transition: background-color .5s ease-out, color .25s ease-out;

    &:hover {
      background-color: $main-color;
      color: white;
    }
  }
}
</style>
