<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { WorkspaceScheduleRecord } from "@/core/models/workspace-schedule-record";
import moment from "moment";

const props = withDefaults(defineProps<{
  title: string,
  date?: Date,
  records: WorkspaceScheduleRecord[],
}>(), {
  title: "none",
  date: () => new Date(),
  records: () => [],
});
const date = computed(() => {
  return moment(props.date).format("DD.MM")
});

</script>

<template>
  <div class="schedule-card">
    <div class="schedule-card__header">
      <div class="title-medium-16">{{props.title}}</div>
      <b-badge pill variant="light">{{date}}</b-badge>
    </div>
    <b-card-body>

    </b-card-body>
  </div>
</template>

<style lang="scss" scoped>
.schedule-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 2px solid #0a0a0a;
  min-width: 300px;
  min-height: 500px;
  margin: 16px;
  box-sizing: border-box;
  overflow: hidden;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 8px 16px;
    background-color: #0a0a0a;
    color: #ffffff;
    text-transform: uppercase;
  }
}
</style>
