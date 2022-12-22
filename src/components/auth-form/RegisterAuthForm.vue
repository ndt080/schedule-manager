<template>
  <div class="auth-modal modal fade" ref="authModalElement">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="auth-modal__title title-semi-32">Confirm your email</h2>
          <div class="auth-modal__group">
            To complete the registration, go to the mailbox <b>{{credentials.email}}</b>
            and confirm your email
          </div>
          <div class="auth-modal__group_button">
            <b-button class="auth-modal__button" @click="closeModal">Close</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TheSpinner v-if="isLoading"/>
  <b-form class="form" @submit.prevent="handleSubmit" :class="{'form--loading': isLoading}">
    <b-form-group class="form-group" label="Name:">
      <b-form-input
        class="form-control"
        id="nameInput"
        placeholder="Enter name..."
        :state="nameState"
        name="name"
        v-model="credentials.name"
      />
      <b-form-invalid-feedback id="nameInput">Invalid name length</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group class="form-group" label="Email:">
      <b-form-input
        class="form-control"
        id="emailInput"
        placeholder="Enter email..."
        :state="emailState"
        name="email"
        v-model="credentials.email"
      />
      <b-form-invalid-feedback id="emailInput">Invalid email value</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group class="form-group" label="Password:">
      <b-form-input
        class="form-control"
        id="passwordInput"
        placeholder="Enter password..."
        :state="passwordState"
        name="password"
        type="password"
        v-model="credentials.password"
      />
      <b-form-invalid-feedback id="passwordInput">Invalid password value</b-form-invalid-feedback>
    </b-form-group>

    <b-button class="form-btn app-button app-button--primary" type="submit">Create</b-button>
  </b-form>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Modal } from "bootstrap";
import type { User } from "@/core/models/user";
import NotificationService from "@/services/notifications/notification.service";
import TheSpinner from "@/components/TheSpinner.vue";


interface Credentials {
  name?: string;
  email?: string;
  password?: string;
}

const router = useRouter();
const store = useAuthStore();

const authModalElement = ref<HTMLElement>();
const authModal = ref<Modal>();
const isLoading = ref(false);

const credentials = reactive({} as Credentials);
const v$ = useVuelidate({
  name: { required, minLength: minLength(2) },
  email: { required, email },
  password: { required, minLength: minLength(8) },
}, credentials as any, { $autoDirty: true });

const nameState = computed(() => !credentials.name ? null : !v$.value.name.$error);
const emailState = computed(() => !credentials.email ? null : !v$.value.email.$error);
const passwordState = computed(() => !credentials.password ? null : !v$.value.password.$error);


onMounted(() => {
  authModal.value = new Modal(authModalElement.value!, { keyboard: true });
});

async function handleSubmit() {
  if (!await v$.value.$validate()) return;

  isLoading.value = true;
  await store.signUp(
    credentials.email || "",
    credentials.password || "",
    credentials.name || "",
  )
    .then(() => openModal())
    .catch((error) => NotificationService.error(error.toString()));
  isLoading.value = false;
}

const openModal = () => authModal.value?.show();
const closeModal = () => authModal.value?.hide();
</script>

<style lang="scss" scoped>
.form.form--loading {
  opacity: 0.1;
}

.form-group {
  margin: 10px 0 20px 0;
}

.form-control {
  display: block;
  width: 300px !important;
  min-height: 28px;
  box-sizing: border-box;
}

.form-btn {
  width: 150px !important;
  border-radius: 15px;
  background-color: $main-color;
  border: none;
}

.btn-reset-password {
  text-align: center;
  margin: 25px 0;
}

.auth-modal {
  .modal-dialog {
    .modal-content {
      border-radius: 15px;
      padding: 10px;
    }
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
