<template>
  <b-modal
    id="workspace-create-modal"
    class="create-modal"
    v-model="showModal"
    centered
    hide-footer
    hide-header
    scrollable
    size="lg"
  >
    <h2 class="create-modal__title title-semi-32">Create workspace</h2>

    <b-overlay :show="isLoading">
      <b-form class="form" @submit.prevent="handleSubmit">
      <b-form-group class="create-modal__group" label="Name: ">
        <b-form-input
          class="create-modal__input"
          placeholder="Enter name..."
          type="text"
          name="name"
          :state="nameState"
          v-model="workspace.name"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group class="create-modal__group" label="Description: ">
        <b-form-textarea
          class="create-modal__input"
          placeholder="Enter description..."
          type="text"
          name="description"
          :state="descriptionState"
          v-model="workspace.description"
        >
        </b-form-textarea>
      </b-form-group>
      <b-form-group class="create-modal__group">
        <b-form-checkbox
          class="create-modal__input"
          name="isCustomImage"
          v-model="workspace.isImage"
        >
          Do you want to use your own icon?
        </b-form-checkbox>
      </b-form-group>

      <b-form-group class="create-modal__group" label="Icon: " v-if="workspace.isImage">
        <b-form-input
          class="create-modal__input"
          placeholder="Enter icon url..."
          type="url"
          name="icon"
          v-model="workspace.icon"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group class="create-modal__group_button">
        <b-button
          class="create-modal__button app-button app-button--primary"
          type="submit"
          :disabled="hasError"
        >
          Create workspace
        </b-button>
      </b-form-group>
    </b-form>
    </b-overlay>
  </b-modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { useWorkspaceStore } from "@/stores/workspace";
import { WorkspaceRequest } from "@/core/models/api/workspace-request";
import NotificationService from "@/services/notifications/notification.service";

import TheSpinner from "@/components/TheSpinner.vue";


export interface WorkspaceInput {
  name?: string;
  description?: string;
  icon?: string;
  isImage?: boolean;
}

const store = useWorkspaceStore();
const showModal = ref(false);
const isLoading = ref(false);
const workspace = reactive<WorkspaceInput>({ name: "", description: "", isImage: false });
const v$ = useVuelidate({
  name: {
    required,
    minLength: minLength(2),
  },
  description: {
    required,
    minLength: minLength(2),
  },
}, workspace as any, { $autoDirty: true });

const nameState = computed(() => !workspace.name ? null : !v$.value.name.$error);
const descriptionState = computed(() => !workspace.description ? null : !v$.value.description.$error);
const hasError = computed(() => {
  return !workspace.name || !workspace.description ||
    v$.value.name.$error || v$.value.description.$error;
});


async function handleSubmit() {
  if (!await v$.value.$validate()) return;

  isLoading.value = true;
  const data = createWorkspace(workspace);

  await store.createWorkspace(data)
    .then(() => (showModal.value = false))
    .catch((error) => NotificationService.error(error.toString()));
  isLoading.value = false;
}

const createWorkspace = (data: WorkspaceInput) => ({
  name: data.name,
  description: data.description,
  image: data.icon,
} as WorkspaceRequest);
</script>

<style lang="scss">
#workspace-create-modal {
  .modal-dialog {
    .modal-content {
      border-radius: 15px;
      padding: 10px;
    }
  }
}
</style>

<style lang="scss" scoped>
.form {
  &.form--loading {
    opacity: 0.1;
  }
}

.create-modal {
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
