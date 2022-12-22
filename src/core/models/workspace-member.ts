import { User } from "@/core/models/user";
import { WorkspaceMemberStatus } from "@/core/consts/workspace-member-status";

export interface WorkspaceMember {
  id?: number;
  member?: User;
  status?: WorkspaceMemberStatus;
}
