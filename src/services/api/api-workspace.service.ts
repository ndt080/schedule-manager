import api from "@/middlewares/api";
import type { UserRequest } from "@/core/models/api/user-request";
import type { User } from "@/core/models/user";
import type { Tokens } from "@/core/models/tokens";
import { WorkspaceRequest } from "@/core/models/api/workspace-request";

class ApiWorkspaceService {
  async getUserWorkspaces() {
    return await api.get("/workspaces/me");
  }

  async getWorkspace(id: number) {
    return await api.get(`/workspace/${id}`);
  }

  async searchWorkspaces(query: string) {
    return await api.get(`/workspaces/search?name=${query}`);
  }

  async createWorkspace(data: WorkspaceRequest) {
    return await api.post(`/workspace`, data);
  }

  async removeWorkspace(id: number) {
    return await api.delete(`/workspace/${id}`);
  }

  async createWorkspaceTask(workspaceId: number, name: string, description: string) {
    return await api.post(`/workspace/${workspaceId}/task`, { name, description });
  }

  async removeWorkspaceTask(id: number) {
    return await api.delete(`/workspace/task/${id}`);
  }

  async updateWorkspace(data: WorkspaceRequest) {
    return await api.put(`/workspace`, data);
  }

  async createWorkspaceQueue(workspaceId: number, name: string) {
    return await api.post(`/workspace/${workspaceId}/queue`, { name });
  }

  async addMemberToWorkspace(wid: number, email: string, status: string) {
    return await api.post(`/workspace/${wid}/member`, { email, status });
  }

  async joinToWorkspaceQueue(id: number) {
    return await api.post(`/workspace/queue/${id}/join`);
  }

  async leaveToWorkspaceQueue(id: number, uid: number) {
    return await api.delete(`/workspace/queue/${id}/leave/${uid}`);
  }

  async removeWorkspaceQueue(id: number) {
    return await api.delete(`/workspace/queue/${id}`);
  }
}

export default new ApiWorkspaceService();
