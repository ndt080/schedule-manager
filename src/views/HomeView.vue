<script setup lang="ts">
import AppWorkspaceList from "@/components/app-workspace-list/AppWorkspaceList.vue";
import { useWorkspaceStore } from "@/stores/workspace";
import { computed, onMounted, reactive, ref } from "vue";
import { Workspace } from "@/core/models/workspace";
import { useRouter } from "vue-router";
import { RouterPaths } from "@/core/consts/router-paths";
import TheSpinner from "@/components/TheSpinner.vue";
import NotificationService from "@/services/notifications/notification.service";
import { useNavbarStore } from "@/stores/navbar";

const store = useWorkspaceStore();
const navbar = useNavbarStore();
const router = useRouter();

const isMounted = ref(false);
const isLoading = ref(false);

const searchQuery = ref("");
const searchResult = ref<Workspace[]>([]);

const workspaces = computed(() => store.workspacesData);

const defaultListConfig = reactive({
  color: "rgba(173, 216, 188, 0.6)",
  title: "Your workspaces",
});
const searchListConfig = reactive({
  color: "rgba(226, 224, 224, 0.6)",
  title: "Found workspaces",
});

onMounted(() => (isMounted.value = true));


async function onSubmitSearch(event: SubmitEvent) {
  event.preventDefault();
    isLoading.value = true;
    await store.searchWorkspaces(searchQuery.value)
      .then((data: Workspace[]) => (searchResult.value = data))
      .catch((err) => NotificationService.error(err.toString()))
    isLoading.value = false;
}

function onSelectWorkspace(workspace: Workspace) {
  navbar.setVisibility(false);
  router.push(`/${RouterPaths.WORKSPACE}/${workspace.id}`);
}
</script>

<template>
  <main class="page">
    <Teleport to="#app-header-toolbar" v-if="isMounted">
    </Teleport>

    <div class="autocomplete">
      <b-form class="autocomplete__group" @submit="onSubmitSearch">
        <b-form-input
          v-model="searchQuery"
          class="autocomplete__input"
          type="search"
        />
        <b-button class="autocomplete__button" variant="link" type="submit">
          <i class="bi bi-search"></i>
        </b-button>
      </b-form>
    </div>

    <TheSpinner v-if="isLoading"/>

    <template v-if="searchResult.length">
      <AppWorkspaceList
        :color="searchListConfig.color"
        :items="searchResult"
        :title="searchListConfig.title"
        @selected="onSelectWorkspace"
      />
    </template>

    <AppWorkspaceList
      :color="defaultListConfig.color"
      :items="workspaces"
      :title="defaultListConfig.title"
      @selected="onSelectWorkspace"
    />
  </main>
</template>

<style scoped lang="scss">
.autocomplete {
  &__group {
    position: relative;
  }

  &__input {
    border-radius: 15px;
  }

  &__button {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    right: 0;
    margin: 1px 1px 0 0;
    height: calc(100% - 2px);
    border-radius: 0 15px 15px 0;
    background-color: white;
  }
}
</style>
