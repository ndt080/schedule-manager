<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from "vue";
import WorkspaceScheduleCard from "@/components/workspace/WorkspaceScheduleCard.vue";
import { useWorkspaceStore } from "@/stores/workspace";
import { WorkspaceSchedule } from "@/core/models/workspace-schedule";
import moment from "moment";
import { ScheduleCard } from "@/core/models/components/schedule-card";
import { Weekdays } from "@/core/consts/weekdays";

const props = withDefaults(defineProps<{ canEdit: boolean }>(), {
  canEdit: false,
});

const workspaceStore = useWorkspaceStore();
const schedules = computed(() => workspaceStore?.workspace?.schedules);
const activeSchedule = ref<WorkspaceSchedule>();
const cards = ref<ScheduleCard[]>([]);


onMounted(() => {
  const now = moment();
  const currWeekDate = moment().add(-now.day() - 1, "days");

  activeSchedule.value = schedules.value?.find((schedule: WorkspaceSchedule) => {
    const start = moment(schedule?.startDate, "YYYY-MM-DD");
    const end = moment(start).add(6, "days");
    return now.isBetween(start, end, undefined, "[]");
  });

  const activeWeekDate = moment(activeSchedule.value?.startDate, "YYYY-MM-DD");
  cards.value = Array.from({ length: 7 }, (_, i): ScheduleCard => {
    if (activeSchedule.value && activeSchedule.value?.records?.length) {
      const records = activeSchedule.value?.records.filter((record) => {
        const recordDateStr = moment(record?.startDateTime).format("YYYY-MM-DD");
        return activeWeekDate.format("YYYY-MM-DD") == recordDateStr;
      });

      const card = { date: activeWeekDate.toDate(), title: Weekdays[i], records: records };
      activeWeekDate.add(1, "day");
      return card;
    }

    currWeekDate.add(1, "day");
    return { title: Weekdays[i], date: currWeekDate.toDate(), records: [] };
  });
});
</script>

<template>
  <section class="schedule-list custom-scroll">
    <WorkspaceScheduleCard
      v-for="(card, index) of cards"
      :key="index"
      :title="card.title"
      :date="card.date"
      :records="card.records"
    />
  </section>
</template>

<style lang="scss" scoped>
.schedule-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
}
</style>
