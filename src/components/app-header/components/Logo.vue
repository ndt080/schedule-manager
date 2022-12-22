<template>
  <router-link to="/" class="logo">
    <img src="@/assets/img/logo.svg" alt="logo" />
    <span class="logo__text">schedule.manager</span>
  </router-link>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  font-size: 26px;
  text-decoration: none;
  color: $dark-color;
}

.logo img {
  width: 35px;
  height: 35px;
  margin-right: 15px;
}

@media screen and (max-width: 750px) {
  .logo__text {
    display: none;
  }
}
</style>
