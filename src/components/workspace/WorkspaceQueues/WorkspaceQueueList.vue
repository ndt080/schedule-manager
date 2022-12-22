<script lang="ts" setup>
import { defineProps, onMounted, ref } from "vue";
import { WorkspaceQueue } from "@/core/models/workspace-queue";
import WorkspaceQueueCard from "./WorkspaceQueueCard.vue";

const props = withDefaults(defineProps<{
  canEdit: boolean,
  queues: WorkspaceQueue[]
}>(), {
  canEdit: false,
  queues: () => []
});

</script>

<template>
  <section class="queue-list custom-scroll">
    <WorkspaceQueueCard
      v-for="(card, index) of props.queues"
      :key="index"
      :title="card?.name"
      :members="card?.members"
      :id="card?.id"
      :can-edit="props.canEdit"
    />
  </section>
</template>

<style lang="scss" scoped>
.queue-list {
  display: flex;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-top: 0;
}
</style>
