<template>
  <header class="header" @on="scrollWindow()">
    <div class="header__container" :class="{'pinned': isScrollWindow}">
      <Logo />
      <div class="header__portal" id="app-header-toolbar"></div>
      <div class="header__toolbar">
        <b-button
          v-if="isShowInstallBtn"
          class="install-btn"
          variant="primary"
          @click="installApp"
        >
          <i class="bi bi-download"></i>
        </b-button>

        <b-dropdown class="header__dropdown dropdown" variant="link" no-caret right>
          <template #button-content class="dropdown__icon_box">
            <i class='bi bi-bell-fill dropdown__icon fa-icon'></i>
          </template>
          <b-dropdown-item>Уведомления отсутствуют</b-dropdown-item>
        </b-dropdown>

        <b-dropdown class="header__dropdown dropdown" variant="link" no-caret right>
          <template #button-content>
            <b-avatar class="dropdown__icon" :src="getAvatar" variant="success"></b-avatar>
          </template>
          <b-dropdown-item
            class="dropdown__item"
            v-for="item of ToolbarItems"
            :to="`/${item.link}`"
            :key="item.title"
          >
            {{ item.title }}
          </b-dropdown-item>
          <b-dropdown-item @click="exit()">Logout</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterPaths } from "@/core/consts/router-paths";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ToolbarItems } from "@/components/app-header/consts/toolbar-items.const";
import InstallButton from "@/components/app-install-button/InstallButton.vue";
import Logo from "@/components/app-header/components/Logo.vue";
import { useAppStore } from "@/stores/app";
import { useUserStore } from "@/stores/user";
import { useWorkspaceStore } from "@/stores/workspace";

const store = useAuthStore();
const appStore = useAppStore();
const userStore = useUserStore();
const workspaceStore = useWorkspaceStore();
const router = useRouter();

const isScrollWindow = ref(false);
const isShowInstallBtn = computed(() => appStore.isShowInstallBtn);
const getAvatar = computed(() => store.currentUser?.image
  ? store.currentUser?.image
  : "https://i.ibb.co/zm3YCP3/avatar.png"
);

onMounted(() => window.addEventListener("scroll", scrollWindow));
onUnmounted(() => window.removeEventListener("scroll", scrollWindow));

const scrollWindow = () => (isScrollWindow.value = window.scrollY > 70);

const exit = async () => {
  store.logout();
  userStore.clear();
  workspaceStore.clear();
  await router.push(`/${RouterPaths.LOGIN}`);
};

async function installApp() {
  const deferredPrompt = appStore.installEvent;
  deferredPrompt?.prompt();
  const result = await deferredPrompt?.userChoice;

  console.log(`User response to the install prompt: ${result?.outcome}`);
  appStore.setVisibilityInstallBtn(false);
  appStore.setDeferredPrompt(undefined);
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  padding: 15px 20px 15px 30px;

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    transition: all .3s ease;
  }

  &__toolbar, &__portal {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.header__container.pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px;
  padding: 15px 10px 15px 20px;
  background-color: $main-bg-color;
}

.dropdown__icon_box {
  display: flex;
  align-items: center;
  height: 100%;
}

.dropdown__icon, .install-btn {
  font-size: 24px;
  color: $dark-color;
}

.install-btn {
  background: none;
  border: none;
}

@media (max-width: 550px) {
  .header {
    padding: 0 20px;
  }
}
</style>
