import { WorkspaceMember } from "@/core/models/workspace-member";
import { WorkspaceTask } from "@/core/models/workspace-task";
import { WorkspaceSchedule } from "@/core/models/workspace-schedule";
import { WorkspaceQueue } from "@/core/models/workspace-queue";

export interface Workspace {
  id?: number;
  name: string;
  description?: string;
  image?: string;
  createdAt?: Date;
  members?: WorkspaceMember[];
  tasks?: WorkspaceTask[];
  schedules?: WorkspaceSchedule[];
  queues?: WorkspaceQueue[];
}
