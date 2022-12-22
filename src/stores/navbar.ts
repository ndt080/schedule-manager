import { defineStore } from "pinia";
import { UserStorageService } from "@/services/storage/user-storage.service";
import type { User } from "@/core/models/user";
import ApiAuthService from "@/services/api/api-auth.service";
import type { UserRequest } from "@/core/models/api/user-request";
import TokenStorageService from "@/services/storage/token-storage.service";
import ApiUserService from "@/services/api/api-user.service";
import { Workspace } from "@/core/models/workspace";
import ApiWorkspaceService from "@/services/api/api-workspace.service";
import WorkspaceMapper from "@/core/mappers/workspace.mapper";
import { WorkspaceRequest } from "@/core/models/api/workspace-request";

export const useNavbarStore = defineStore({
  id: "navbar",
  state: () => ({
    visibility: true,
  }),
  getters: {
    isShow: (state) => state.visibility
  },
  actions: {
    setVisibility(value: boolean) {
      this.visibility = value;
    }
  },
});
