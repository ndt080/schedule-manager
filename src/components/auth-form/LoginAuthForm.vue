<template>
  <TheSpinner v-if="isLoading"/>
  <b-form class="form" @submit.prevent="handleSubmit" :class="{'form--loading': isLoading}">
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
    <b-button class="form-btn app-button app-button--primary" type="submit">Sign in</b-button>
  </b-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import NotificationService from "@/services/notifications/notification.service";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/core/models/user";
import { RouterPaths } from "@/core/consts/router-paths";
import TheSpinner from "@/components/TheSpinner.vue";


interface Credentials {
  email?: string;
  password?: string;
}

const router = useRouter();
const store = useAuthStore();

const isLoading = ref(false);
const credentials = reactive({} as Credentials);
const v$ = useVuelidate({
  email: { required, email },
  password: { required, minLength: minLength(6) }
}, credentials as any, { $autoDirty: true });

const emailState = computed(() => !credentials.email ? null : !v$.value.email.$error);
const passwordState = computed(() => !credentials.password ? null : !v$.value.password.$error);


async function handleSubmit()  {
  if (!await v$.value.$validate()) return;

  isLoading.value = true;
  await store.signIn(credentials.email || "", credentials.password || "")
    .then((user: User) => {
      router.push(`/${user.isVerified ? RouterPaths.HOME : RouterPaths.NOT_VERIFIED}`)
    })
    .catch((error) => NotificationService.error(error.toString()));
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.form {
  &.form--loading {
    opacity: 0.1;
  }

  &-group {
    margin: 10px 0 20px 0;
  }

  &-control {
    display: block;
    width: 300px !important;
    min-height: 28px;
    box-sizing: border-box;
  }
}
</style>
