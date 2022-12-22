<script lang="ts" setup>
import { defineProps, ref } from "vue";
import { WorkspaceTask } from "@/core/models/workspace-task";
import { useWorkspaceStore } from "@/stores/workspace";
import NotificationService from "@/services/notifications/notification.service";

const props = defineProps<{task?: WorkspaceTask, canEdit: boolean}>();
const store = useWorkspaceStore();

const showModal = ref(false);
const isLoading = ref(false);

const onCloseModal = () => (showModal.value = false);
const onRemoveTask = async () => {
  const id = props.task?.id!;
  isLoading.value = true;

  await store.removeWorkspaceTask(id)
    .then(() => {
      showModal.value = false;
      NotificationService.success(`Task №${id} was removed`)
    })
    .catch((err) => NotificationService.error(err?.toString()));

  isLoading.value = false;
}
</script>

<template>
  <b-modal
    id="task-details-modal"
    class="task-details"
    v-model="showModal"
    centered
    hide-footer
    hide-header
    scrollable
    size="lg"
  >
    <b-overlay :show="isLoading">
      <div class="task-details__header">
        <h2 class="task-details__title title-semi-32">Task #{{props.task?.id}} details</h2>
        <b-button
          variant="light"
          class="task-details__header_btn title-regular-28"
          @click="onRemoveTask"
          v-if="props.canEdit"
        >
          <i class="task-details--danger bi bi-trash-fill"></i>
        </b-button>
      </div>
      <h5 class="title-semi-18">Name:</h5>
      <h6 class="title-regular-14">{{props.task?.name}}</h6>
      <h6 class="title-semi-18">Description:</h6>
      <p class="title-regular-14">{{props.task?.description}}</p>
      <div class="task-details__group_button" @click="onCloseModal">
        <b-button class="btn app-button app-button--primary">Close</b-button>
      </div>
    </b-overlay>
  </b-modal>
</template>

<style lang="scss">
#task-details-modal {
  .modal-dialog {
    .modal-content {
      border-radius: 15px;
      padding: 10px;
    }
  }
}
</style>

<style lang="scss" scoped>
.task-details--danger {
  color: rgba(220, 53, 69, 1);
}

.form {
  &.form--loading {
    opacity: 0.1;
  }
}

.task-details {
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__group {
    margin-bottom: 20px;
  }

  &__group_button {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  &__input {
    border-radius: 15px;
  }
}
</style>
