<script lang="ts" setup>
import { defineProps } from "vue";
import WorkspaceScheduleList from "@/components/workspace/WorkspaceScheduleList.vue";

const props = withDefaults(defineProps<{canEdit: boolean}>(), {
  canEdit: false,
});
</script>

<template>
  <section class="workspace-section">
    <WorkspaceScheduleList :can-edit="props.canEdit" />
  </section>
</template>

<style lang="scss" scoped>

</style>
