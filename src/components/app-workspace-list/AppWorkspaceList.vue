<template>
  <section :id="dataViewId" class="workspace-list">
    <div
      :style="{'background-color': color}"
      class="workspace-list__title title-semi-18"
    >
      {{ title }}
    </div>
    <ul id="item-list" class="workspace-list__body">
      <li v-for="(workspace, index) of workspaces" :key="index" class="workspace-list__item">
        <div class="workspace-list__card" @click="onSelect(workspace)">
          <div class="workspace-list__image">
            <img :src="workspace.image" alt="wc_icon">
          </div>
          <div class="workspace-list__card_title">{{ workspace.name }}</div>
        </div>
      </li>
      <AppEmptyWorkspaceList v-if="!props.items.length" />
    </ul>
    <b-pagination
      v-if="props.items.length > perPage"
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="props.items.length"
      aria-controls="item-list"
      class="workspace-list__pagination"
      first-number
      last-number
    >
      <template #prev-text>
        <i class="bi bi-caret-left-fill"></i>
      </template>
      <template #next-text>
        <i class="bi bi-caret-right-fill"></i>
      </template>
    </b-pagination>
  </section>
</template>

<script lang="ts" setup>
import { Workspace } from "@/core/models/workspace";
import { computed, ref } from "vue";
import AppEmptyWorkspaceList from "@/components/app-workspace-list/AppEmptyWorkspaceList.vue";

const props = withDefaults(defineProps<{
  title?: string;
  items?: Workspace[],
  color?: string;
  perPage?: number;
}>(), {
  title: "none",
  items: () => [],
  color: "rgba(0, 60, 255, 1)",
  perPage: 5,
});

const dataViewId = `dataView-${new Date().getTime()}`;
const currentPage = ref(1);
const emits = defineEmits(["selected"]);

const workspaces = computed(() => {
  return props.items.slice(
    (currentPage.value - 1) * props.perPage,
    currentPage.value * props.perPage,
  );
});

const onSelect = (workspace: Workspace) => {
  emits("selected", workspace)
};
</script>

<style lang="scss">
.workspace-list {
  &__pagination {
    max-width: 100%;

    .page-link, .page-item.disabled {
      border: none !important;
      color: rgba($pagination-color, .8);
    }

    .page-item.active .page-link {
      background-color: $pagination-color;
      border-radius: 5px;
    }
  }
}
</style>

<style lang="scss" scoped>
.workspace-list {
  &__title {
    align-items: center;
    border-radius: 15px;
    box-sizing: border-box;
    color: #0a0a0a;
    display: flex;
    height: 40px;
    justify-content: flex-start;
    line-height: 0;
    margin: 30px 0 15px 0;
    padding: 0 20px;
    text-transform: uppercase;
    width: 100%;
    border: 2.5px solid #0a0a0a;
  }

  &__body {
    list-style: none;
    padding: 0;
  }

  &__card {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    min-height: 50px;

    border: 1px solid rgba($dark-color, 0.2);
    border-radius: 15px;

    margin: 5px 0;
    padding: 5px 10px;
    background-color: $main-bg-color;
    transition: background-color .5s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: rgba(226, 224, 224, 1);
      transition: background-color 0.5s ease-in-out;
    }
  }

  &__image {
    display: block;
    border-radius: 10px;
    margin-right: 10px;
    max-height: 32px;
    max-width: 32px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__card_title {
    margin-right: 40px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__card_text {
    max-width: 50vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__link {
    color: $dark-color;
    text-decoration: none;
  }
}
</style>
