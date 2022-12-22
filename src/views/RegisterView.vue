<template>
  <section class="register">
    <h1 class="register__title title-semi-32">Creating an account</h1>
    <RegisterAuthForm />
    <div class="register__help">
      <div>
        Already have an account?
        <router-link class="register__link" :to="`/${RouterPaths.LOGIN}`">Sign in</router-link>
      </div>
      <router-link
        class="register__link"
        :to="`/${RouterPaths.FORGET_PASSWORD}`"
      >
        Forget password?
      </router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { RouterPaths } from "@/core/consts/router-paths";
import RegisterAuthForm from "@/components/auth-form/RegisterAuthForm.vue";

</script>

<style lang="scss" scoped>
.register {
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
