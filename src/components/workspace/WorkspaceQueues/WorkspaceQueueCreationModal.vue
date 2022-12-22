<script lang="ts" setup>
import TheSpinner from "@/components/TheSpinner.vue";
import { computed, defineProps, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { useWorkspaceStore } from "@/stores/workspace";
import NotificationService from "@/services/notifications/notification.service";

const props = defineProps<{workspaceId?: number}>();
const store = useWorkspaceStore();

const queue = reactive({ name: "" });
const showModal = ref(false);
const isLoading = ref(false);

const v$ = useVuelidate({
  name: { required, minLength: minLength(2) },
}, queue as any, { $autoDirty: true });

const hasError = computed(() => !queue.name || v$.value.name.$error);

async function handleSubmit() {
  if (!await v$.value.$validate()) return;

  isLoading.value = true;

  await store.createWorkspaceQueue(props.workspaceId!, queue.name)
    .then(() => (showModal.value = false))
    .catch((error) => NotificationService.error(error.toString()));

  isLoading.value = false;
}
</script>

<template>
  <b-modal
    id="queue-creation-modal"
    class="create-modal"
    v-model="showModal"
    centered
    hide-footer
    hide-header
    scrollable
    size="lg"
  >
    <h2 class="create-modal__title title-semi-32">Create queue</h2>
    <TheSpinner v-if="isLoading" />
    <b-form class="form" @submit.prevent="handleSubmit" :class="{'form--loading': isLoading}">
      <b-form-group class="create-modal__group" label="Name: ">
        <b-form-input
          class="create-modal__input"
          placeholder="Enter name..."
          type="text"
          name="name"
          :state="!queue.name ? null : !v$.name.$error"
          v-model="queue.name"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group class="create-modal__group_button">
        <b-button
          class="create-modal__button app-button app-button--primary"
          type="submit"
          :disabled="hasError"
        >
          Create queue
        </b-button>
      </b-form-group>
    </b-form>

  </b-modal>
</template>

<style lang="scss">
#queue-creation-modal {
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
</style>
