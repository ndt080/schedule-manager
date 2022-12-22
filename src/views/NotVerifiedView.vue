<template>
  <section class="verification">
    <h1 class="verification__title title-semi-32">Аккаунт не подтвержден</h1>
    <TheSpinner v-if="isLoading"/>
    <div class="verification__body title-regular-14" :class="{'verification--loading': isLoading}">
      <b-button
        v-if="user?.email"
        class="form-btn app-button app-button--primary"
        @click="confirmEmail"
      >
        Отправить письмо повторно
      </b-button>
    </div>
    <div class="verification__help">
      <router-link class="verification__link" :to="`/${RouterPaths.LOGIN}`">Вернуться ко входу</router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { RouterPaths } from "@/core/consts/router-paths";
import LoginAuthForm from "@/components/auth-form/LoginAuthForm.vue";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { User } from "@/core/models/user";
import TheSpinner from "@/components/TheSpinner.vue";
import { useRouter } from "vue-router";
import NotificationService from "@/services/notifications/notification.service";

const store = useAuthStore();
const router = useRouter();
const user = ref<User>(store.currentUser);
const isLoading = ref<boolean>(false);

const confirmEmail = async () => {
  isLoading.value = true;
  await store.confirmEmailAgain(user.value?.email || "")
    .then(() => router.push(`/${RouterPaths.LOGIN}`))
    .catch((error) => NotificationService.error(error.toString()));
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.verification {
  position: relative;

  &__body {
    padding-top: 36px;
  }

  &__body.verification--loading {
    opacity: 0.1;
  }

  &__help {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 30px 0;
  }

  &__link {
    text-decoration: none;
    cursor: pointer;
    color: $main-color;
  }

  &__link:hover {
    color: $orange-color;
  }
}
</style>
