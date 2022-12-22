<script lang="ts" setup>
import { computed, defineProps, onMounted, reactive, ref } from "vue";
import { useWorkspaceStore } from "@/stores/workspace";
import { email, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { Workspace } from "@/core/models/workspace";
import { WorkspaceRequest } from "@/core/models/api/workspace-request";
import NotificationService from "@/services/notifications/notification.service";
import { RouterPaths } from "@/core/consts/router-paths";
import { useRouter } from "vue-router";
import TheSpinner from "@/components/TheSpinner.vue";
import { WorkspaceMemberStatus } from "@/core/consts/workspace-member-status";

const store = useWorkspaceStore();
const router = useRouter();
const workspace = computed(() => store.workspaceData);
const hasChanges = ref(false);
const isLoading = ref(false);
const props = withDefaults(defineProps<{ canEdit: boolean }>(), {
  canEdit: false,
});

const settings = reactive({ name: "", description: "", image: "" });
const invite = reactive({ email: "", status: "" });

const v$ = useVuelidate({
  name: { required, minLength: minLength(2) },
  description: { required, minLength: minLength(2) },
  image: { required, url: true },
}, settings as any, { $autoDirty: true });

const inviteV$ = useVuelidate({
  email: { required, email }, status: { required },
}, invite as any, { $autoDirty: true });
const hasInviteError = computed(() => {
  return !invite.email || !invite.status ||
    inviteV$.value.email.$error || inviteV$.value.status.$error;
});


onMounted(() => {
  initSettings(workspace.value);
});

function initSettings(workspace: Workspace) {
  settings.name = workspace.name;
  settings.description = workspace.description || "";
  settings.image = workspace.image || "";
}

function onChanged() {
  hasChanges.value = true;
}

async function onSubmitChanges(event: SubmitEvent) {
  event.preventDefault();
  isLoading.value = true;
  const data: WorkspaceRequest = {
    id: workspace.value.id,
    name: settings.name,
    description: settings.description,
    image: settings.image,
  };

  await store.updateWorkspace(data)
    .then(() => {
      hasChanges.value = false;
      NotificationService.success("Workspace settings changed successfully");
    })
    .catch((err) => NotificationService.error(err.toString()));
  isLoading.value = false;
}

async function onRemoveWorkspace() {
  if (confirm("Do you really want to delete the workspace?")) {
    isLoading.value = true;
    await store.removeWorkspace(workspace.value.id!)
      .then(() => NotificationService.success("Workspace was removed"))
      .catch((err) => NotificationService.error(err.toString()));
    await router.push(`/${RouterPaths.HOME}`);
    store.cleanWorkspaceData();
  }
}

async function onSubmitInvite(event: SubmitEvent) {
  isLoading.value = true;
  await store.addMemberToWorkspace(workspace.value?.id!, invite.email, invite.status)
    .then(() => {
      invite.email = "";
      invite.status = "";
      (event.target as HTMLFormElement)?.reset();
      NotificationService.success("User successfully added");
    })
    .catch((err) => {
      console.log()
      NotificationService.error(err?.toString())
    });
  isLoading.value = false;
}
</script>

<template>
  <section class="workspace-section">
    <div class="workspace-section__header">
      <h1 class="title-semi-32">Workspace settings</h1>
      <b-button
        v-if="props.canEdit"
        variant="light"
        class="workspace-section__header_btn title-regular-28"
        @click="onRemoveWorkspace"
      >
        <i class="settings-trash bi bi-trash-fill"></i>
      </b-button>
    </div>

    <TheSpinner v-if="isLoading" />
    <div class="workspace-section__content">
      <b-form @submit="onSubmitChanges">
        <Transition name="height">
          <b-button
            v-if="hasChanges"
            class="settings__btn app-button app-button--error"
            type="submit"
          >
            Save changes
          </b-button>
        </Transition>
        <div class="settings">
          <div class="settings__group">
            <div class="settings__box settings--titles">
              <h6 class="settings__el-title title-medium-18">Name</h6>
            </div>
            <div class="settings__box">
              <b-form-input
                class="form-control settings-control"
                v-model="settings.name"
                @input="onChanged"
                :state="v$.name.$error ? false: null"
                :disabled="!props.canEdit"
              />
            </div>
          </div>

          <div class="settings__group">
            <div class="settings__box settings--titles">
              <p class="settings__el-title title-medium-18">Description</p>
            </div>
            <div class="form-group settings__box">
              <b-form-textarea
                class="form-control settings-control"
                v-model="settings.description"
                @input="onChanged"
                :state="v$.description.$error ? false: null"
                :disabled="!props.canEdit"
              />
            </div>
          </div>

          <div class="settings__group">
            <div class="settings__box settings--titles">
              <p class="settings__el-title title-medium-18">Image</p>
            </div>
            <div class="settings__box">
              <b-form-input
                type="url"
                class="form-control settings-control"
                v-model="settings.image"
                @input="onChanged"
                :state="v$.image.$error ? false: null"
                :disabled="!props.canEdit"
              />
            </div>
          </div>

          <div class="settings__group">
            <div class="settings__box settings--titles">
              <p class="settings__el-title title-medium-18">Invite</p>
            </div>
            <div class="settings__box">
              <b-form class="d-flex align-items-center" @submit.prevent="onSubmitInvite">
                <b-form-input
                  class="form-control settings-control"
                  placeholder="Enter email"
                  v-model="invite.email"
                  :state="!invite.email ? null : !inviteV$.email.$error"
                  style="margin-right: 16px"
                />

                <b-form-select
                  v-model="invite.status"
                  :state="!invite.status ? null : !inviteV$.status.$error"
                  style="margin-right: 16px"
                >
                  <b-form-select-option :value="null">
                    Please select status
                  </b-form-select-option>
                  <b-form-select-option :value="WorkspaceMemberStatus.MEMBER">
                    {{WorkspaceMemberStatus.MEMBER}}
                  </b-form-select-option>
                  <b-form-select-option
                    v-if="props.canEdit"
                    :value="WorkspaceMemberStatus.EDITOR"
                  >
                    {{WorkspaceMemberStatus.EDITOR}}
                  </b-form-select-option>
                </b-form-select>

                <b-button
                  class="app-button app-button--primary app-button--sm bi bi-plus-lg"
                  type="submit"
                  :disabled="hasInviteError"
                />
              </b-form>
            </div>
          </div>


          <div class="settings__group">
            <div class="settings__box settings--titles">
              <p class="settings__el-title title-medium-18">Members</p>
            </div>
            <div class="settings__box settings-members">
              <ul class="settings-members__list">
                <div
                  class="settings-members__item"
                  v-for="(item, index) of workspace.members" :key="index"
                >
                  <div class="settings-members__item_container">
                    <div class="settings-members__item_image">
                      <img :src="item?.member?.image" alt="wc_icon">
                    </div>
                    <div class="title-medium-16">{{ item?.member?.username }}</div>
                  </div>

                  <div class="settings-members__item_container">
                    <i
                      v-if="item?.status === WorkspaceMemberStatus.OWNER"
                      class="bi bi-star-fill"
                    />
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </b-form>
    </div>

  </section>
</template>

<style lang="scss" scoped>
.settings-trash {
  color: rgba(220, 53, 69, 1);
}

.height-enter-active,
.height-leave-active {
  transition: transform .3s ease-in-out, opacity .5s ease-in-out;
}

.height-enter-from,
.height-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

.settings {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;

  &__btn {
    width: 100% !important;
    margin-bottom: 32px;
  }

  &__box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 8px 16px;
    width: 100%;

    &.settings--titles {
      padding-top: 15px;
      align-items: flex-start;
      border-radius: 16px;
      background-color: $second-bg-color;
    }
  }

  &__group {
    display: grid;
    grid-template-columns: 1fr 4fr;
    width: 100%;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__el-title {
    padding: 0;
    margin: 0;
  }

  &-members {
    &__list {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    &__item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-radius: 8px;
      padding: 8px 10px;
      background-color: rgba($second-bg-color, 0.5);
      margin-bottom: 8px;
      cursor: pointer;
      transition: background-color .5s;

      &:hover {
        background-color: rgba($second-bg-color, 1);
      }

      &:last-child {
        margin-bottom: 0;
      }

      &_container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }

      &_image {
        display: block;
        border-radius: 100%;
        margin-right: 10px;
        max-height: 32px;
        max-width: 32px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .settings {
    &__group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__box.settings--titles {
      width: 93%;
      margin-left: 16px;
      padding-right: 0;
    }
  }

}
</style>
