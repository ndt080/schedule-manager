<template>
  <section class="login">
    <h1 class="login__title title-semi-32">Sign in</h1>
    <LoginAuthForm />
    <div class="login__help">
      <div>
        Do you have no account?
        <router-link class="login__link" :to="`/${RouterPaths.REGISTER}`">Sign up</router-link>
      </div>
      <router-link class="login__link" :to="`/${RouterPaths.FORGET_PASSWORD}`">Forget password?</router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { RouterPaths } from "@/core/consts/router-paths";
import LoginAuthForm from "@/components/auth-form/LoginAuthForm.vue";

</script>

<style lang="scss" scoped>
.login {
  position: relative;

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
