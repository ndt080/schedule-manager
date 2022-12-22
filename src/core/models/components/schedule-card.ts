import { WorkspaceScheduleRecord } from "@/core/models/workspace-schedule-record";

export interface ScheduleCard {
  title: string;
  date?: Date;
  records: WorkspaceScheduleRecord[]
}
