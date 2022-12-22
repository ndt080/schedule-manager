<template>
  <header class="header">
    <router-link to="/" class="header__logo">
      <img src="@/assets/img/logo.svg" alt="logo" />
      schedule.manager
    </router-link>
  </header>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.header {
  font-size: 24px;
  margin-bottom: 50px;
}

.header__logo {
  display: inline-block;
  font-weight: 400;
  text-decoration: none;
  color: $dark-color;
}

.header__logo img {
  width: 10%;
  height: 10%;
  margin-right: 8px;
}
</style>
