<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from "vue";
import { WorkspaceScheduleRecord } from "@/core/models/workspace-schedule-record";
import moment from "moment";
import { useWorkspaceStore } from "@/stores/workspace";
import { WorkspaceMember } from "@/core/models/workspace-member";
import { useUserStore } from "@/stores/user";
import NotificationService from "@/services/notifications/notification.service";

const store = useWorkspaceStore();
const userStore = useUserStore();
const isLoading = ref(false);
const props = withDefaults(defineProps<{
  id?: number
  canEdit: boolean,
  title: string,
  members: number[],
}>(), {
  title: "none",
  canEdit: false,
  members: () => [],
});
const users = computed(() => store.workspaceData.members);
const uid = computed(() => userStore.user?.id);
const membersData = ref<WorkspaceMember[]>()

onMounted(() => {
  initMembers();
});

const onJoin = async () => {
  isLoading.value = true;
  const isExist = !!props.members.find((member) => member === uid.value);

  if(isExist) {
    isLoading.value = false;
    return;
  }

  await store.joinToWorkspaceQueue(props.id!)
    .then(initMembers)
    .catch((err) => NotificationService.error(err?.toString()));

  isLoading.value = false;
};

const onLeave = async () => {
  isLoading.value = true;

  await store.leaveToWorkspaceQueue(props.id!, uid.value!)
    .then(initMembers)
    .catch((err) => NotificationService.error(err?.toString()));

  isLoading.value = false;
}

const onRemoveQueue = async () => {
  isLoading.value = true;

  await store.removeWorkspaceQueue(props.id!)
    .catch((err) => NotificationService.error(err?.toString()));

  isLoading.value = false;
}

const initMembers = () => {
  membersData.value = users.value?.filter((user: WorkspaceMember) => {
    return !!props.members.find((m) => m === user.member?.id)
  }) || [];
}
</script>

<template>
  <div class="queue-card">
    <div class="queue-card__header">
      <div class="title-medium-16">{{props.title}}</div>
      <div class="queue-card__header_toolbar">
        <b-button
          v-if="props.canEdit"
          class="queue-card__header_button button--error bi bi-trash-fill"
          @click="onRemoveQueue"
        />
        <b-button
          class="queue-card__header_button bi bi-plus-circle"
          @click="onJoin"
        />
      </div>
    </div>
    <b-overlay :show="isLoading">
      <b-list-group>
        <template v-for="(member, index) of membersData" :key="index">
          <b-list-group-item class="d-flex align-items-center justify-content-between rounded-0">
            <div class="title-medium-16">{{index + 1}}. {{member?.member?.username}}</div>
            <b-button
              v-if="uid === member?.member?.id  || props.canEdit"
              class="queue-card__header_button button--error bi bi-trash-fill"
              @click="onLeave"
            />
          </b-list-group-item>
        </template>
      </b-list-group>
    </b-overlay>
  </div>
</template>

<style lang="scss" scoped>
.queue-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 2px solid #0a0a0a;
  width: 300px;
  min-height: 450px;
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

    &_toolbar {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }

    &_button {
      background: none;
      padding: 4px 8px;
      font-size: 18px;
      border: none;

      &.button--error {
        color: $danger-color;
      }
    }
  }
}
</style>
