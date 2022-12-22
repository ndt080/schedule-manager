import { WorkspaceScheduleRecord } from "@/core/models/workspace-schedule-record";

export interface WorkspaceSchedule {
  id?: number;
  startDate?: Date;
  records?: WorkspaceScheduleRecord[];
}
