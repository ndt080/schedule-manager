<template>
  <section class="wrapper" :class="{ 'navbar--hidden': !isShow }">
    <div class="navbar__toggle" @click="changeVisibility">
      <i
        class="bi"
        :class="[isShow ? 'bi-chevron-double-left' : 'bi-chevron-double-right']"
      />
    </div>

    <nav class="navbar" :class="{ 'navbar--hidden': !isShow }">
      <div class="navbar__container">
        <ul class="navbar__list">
          <li class="navbar__item" v-for="item of NavbarItems" :key="item.icon">
            <template v-if="item.modal">
              <router-link class="navbar__link" :to="item.url" v-b-modal="item.modal">
                <i class="navbar__icon" :class="`bi-${item.icon}`"></i>
              </router-link>
            </template>
            <router-link class="navbar__link" :to="item.url" v-else>
              <i class="navbar__icon" :class="`bi-${item.icon}`"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { NavbarItems } from "@/core/consts/navbar-items.const";
import { useNavbarStore } from "@/stores/navbar";
import { computed } from "vue";

const navbar = useNavbarStore();
const isShow = computed(() => navbar.isShow);

function changeVisibility() {
  navbar.setVisibility(!isShow.value);
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 105px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  transition: width .5s;

  &.navbar--hidden {
    width: 32px;
  }
}

.navbar {
  position: fixed;
  left: 20px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 100;

  transition: left .5s;

  &__toggle {
    position: sticky;
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    width: 32px;
    height: 32px;
    font-size: 24px;
    z-index: 101;
  }

  &.navbar--hidden {
    left: -150px;
  }

  &__container {
    box-sizing: border-box;
    width: 90px;
    max-height: calc(100vh - 60px - 10px);
    border-radius: 1rem;
    background: $main-bg-color;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }

  &__item {
    width: 100%;
    height: 4.5rem;
    border-radius: 1rem;
    background: $main-bg-color;
    transition: all 0.3s ease-in;
  }

  &__item:hover {
    background: $hover-color;
  }

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: $main-color;
  }

  &__icon {
    font-size: 2rem;
    font-weight: 900;
    color: $main-color;
  }
}

@media (max-width: 850px) {
  .wrapper {
    width: 0;
    margin: 0;

    &.navbar--hidden {
      width: 0;
    }
  }
  .navbar {
    position: fixed;
    margin: 0;
    height: 70px;
    bottom: 20px;
    right: 0;
    left: 0;

    &.navbar--hidden {
      left: 0;
    }

    &__container {
      width: 100%;
      height: 4.5rem;
    }

    &__list {
      flex-direction: row;
    }

    &__toggle {
      display: none;
    }
  }
}
</style>
