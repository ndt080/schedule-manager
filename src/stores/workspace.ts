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
import { WorkspaceTask } from "@/core/models/workspace-task";
import { WorkspaceQueue } from "@/core/models/workspace-queue";
import { WorkspaceMember } from "@/core/models/workspace-member";

interface WorkspaceStoreState {
  workspaceList?: Workspace[],
  workspace?: Workspace,
}

export const useWorkspaceStore = defineStore({
  id: "workspace",
  state: (): WorkspaceStoreState => ({
    workspaceList: [],
    workspace: undefined
  }),
  getters: {
    workspacesData: (state) => state.workspaceList as Workspace[],
    workspaceData: (state) => state.workspace as Workspace,
  },
  actions: {
    async getUserWorkspaces(): Promise<Workspace[]> {
      return ApiWorkspaceService.getUserWorkspaces().then((response) => {
        const list = response.data ? WorkspaceMapper.mapJsonToWorkspaces(response.data) : [];
        this.workspaceList = list;
        return list;
      });
    },
    async getWorkspace(id: number): Promise<Workspace> {
      return ApiWorkspaceService.getWorkspace(id).then((response) => {
        const workspace = WorkspaceMapper.mapJsonToWorkspace(response.data);
        this.workspace = workspace;
        return workspace;
      });
    },
    async searchWorkspaces(query: string): Promise<Workspace[]> {
      return ApiWorkspaceService.searchWorkspaces(query).then((response) => {
        return response.data ? WorkspaceMapper.mapJsonToWorkspaces(response.data) : [];
      });
    },
    async createWorkspace(data: WorkspaceRequest): Promise<Workspace> {
      return ApiWorkspaceService.createWorkspace(data).then((response) => {
        const workspace = WorkspaceMapper.mapJsonToWorkspace(response.data);
        this.workspace = workspace;
        this.workspaceList?.push(workspace);
        return workspace;
      });
    },
    async removeWorkspace(id: number): Promise<boolean> {
      return ApiWorkspaceService.removeWorkspace(id)
        .then(() => true)
        .catch(() => false)
    },
    cleanWorkspaceData() {
      let index = this.workspaceList?.findIndex((workspace) => {
        return workspace.id == this.workspace?.id;
      }) ?? -1;

      if(index != -1) this.workspaceList?.splice(index, 1)
      this.workspace = undefined;
    },
    async createWorkspaceTask(
      workspaceId: number,
      name: string,
      description: string,
    ): Promise<WorkspaceTask> {
      return ApiWorkspaceService.createWorkspaceTask(workspaceId, name, description)
        .then((response) => {
          const task = WorkspaceMapper.mapJsonToWorkspaceTask(response.data);
          this.workspace?.tasks?.push(task);
          return task;
      });
    },
    async removeWorkspaceTask(id: number): Promise<boolean> {
      return ApiWorkspaceService.removeWorkspaceTask(id)
        .then(() => {
          let index = this.workspace?.tasks?.findIndex((task) => {
            return task.id == id;
          }) ?? -1;

          if(index != -1) this.workspace?.tasks?.splice(index, 1)
          return true;
        })
        .catch(() => false)
    },
    async createWorkspaceQueue(workspaceId: number, name: string): Promise<WorkspaceQueue> {
      return ApiWorkspaceService.createWorkspaceQueue(workspaceId, name)
        .then((response) => {
          const queue = WorkspaceMapper.mapJsonToWorkspaceQueue(response.data);
          this.workspace?.queues?.push(queue);
          return queue;
        });
    },
    async addMemberToWorkspace(wid: number, email: string, status: string): Promise<WorkspaceMember> {
      return ApiWorkspaceService.addMemberToWorkspace(wid, email, status)
        .then((response) => {
          const member = WorkspaceMapper.mapJsonToWorkspaceMember(response.data);
          this.workspace?.members?.push(member);
          return member;
        });
    },
    async joinToWorkspaceQueue(id: number): Promise<WorkspaceQueue> {
      return ApiWorkspaceService.joinToWorkspaceQueue(id)
        .then((response) => {
          const queue = WorkspaceMapper.mapJsonToWorkspaceQueue(response.data);

          let index = this.workspace?.queues?.findIndex((task) => {
            return task.id == id;
          }) ?? -1;

          if(index != -1) (this.workspace?.queues as WorkspaceQueue[])[index] = queue

          return queue;
        });
    },
    async leaveToWorkspaceQueue(id: number, uid: number): Promise<WorkspaceQueue> {
      return ApiWorkspaceService.leaveToWorkspaceQueue(id, uid)
        .then((response) => {
          const queue = WorkspaceMapper.mapJsonToWorkspaceQueue(response.data);

          let index = this.workspace?.queues?.findIndex((task) => {
            return task.id == id;
          }) ?? -1;

          if(index != -1) (this.workspace?.queues as WorkspaceQueue[])[index] = queue

          return queue;
        });
    },
    async removeWorkspaceQueue(id: number): Promise<boolean> {
      return ApiWorkspaceService.removeWorkspaceQueue(id)
        .then(() => {
          let index = this.workspace?.queues?.findIndex((queue) => {
            return queue.id == id;
          }) ?? -1;

          if(index != -1) this.workspace?.queues?.splice(index, 1)
          return true;
        })
        .catch(() => false)
    },
    async updateWorkspace(data: WorkspaceRequest): Promise<Workspace> {
      return ApiWorkspaceService.updateWorkspace(data).then((response) => {
        const workspace = WorkspaceMapper.mapJsonToWorkspace(response.data);
        this.workspace = workspace;
        return workspace;
      });
    },
    clear() {
      this.workspace = undefined;
      this.workspaceList = [];
    }
  },
});
