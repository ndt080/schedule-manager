<template>
  <section class="forget-password">
    <h1 class="forget-password__title title-semi-32">Reset Password</h1>
    <ForgetPasswordAuthForm />
    <div class="forget-password__help">
      <router-link class="forget-password__link" :to="`/${RouterPaths.LOGIN}`">
        Go back
      </router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { RouterPaths } from "@/core/consts/router-paths";
import ForgetPasswordAuthForm from "@/components/auth-form/ForgetPasswordAuthForm.vue";
</script>

<style lang="scss" scoped>
.forget-password {
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
