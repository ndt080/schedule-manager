import { Workspace } from "@/core/models/workspace";
import { WorkspaceMember } from "@/core/models/workspace-member";
import { WorkspaceTask } from "@/core/models/workspace-task";
import { WorkspaceSchedule } from "@/core/models/workspace-schedule";
import { WorkspaceQueue } from "@/core/models/workspace-queue";
import { WorkspaceScheduleRecord } from "@/core/models/workspace-schedule-record";
import moment from "moment";

export class WorkspaceMapper {
  mapJsonToWorkspaces = (json: any[]) => json.map(data => {
    return this.mapJsonToWorkspace(data);
  });

  mapJsonToWorkspaceMembers = (json: any[]) => json.map(data => {
    return this.mapJsonToWorkspaceMember(data);
  });

  mapJsonToWorkspaceTasks = (json: any[]) => json.map(data => {
    return this.mapJsonToWorkspaceTask(data);
  });

  mapJsonToWorkspaceSchedules = (json: any[]) => json.map(data => {
    return this.mapJsonToWorkspaceSchedule(data);
  });

  mapJsonToWorkspaceScheduleRecords = (json: any[]) => json.map(data => {
    return this.mapJsonToWorkspaceScheduleRecord(data);
  });

  mapJsonToWorkspaceQueues = (json: any[]) => json.map(data => {
    return this.mapJsonToWorkspaceQueue(data);
  });

  mapJsonToWorkspace = (json: any) => ({
    id: json?.workspace?.id,
    name: json?.workspace?.name,
    description: json?.workspace?.description,
    image: json?.workspace?.image,
    createdAt: moment(json?.workspace?.createdAt).toDate(),
    members: json.members ? this.mapJsonToWorkspaceMembers(json.members) : [],
    tasks: json.tasks ? this.mapJsonToWorkspaceTasks(json.tasks) : [],
    schedules: json.schedules ? this.mapJsonToWorkspaceSchedules(json.schedules) : [],
    queues: json.queues ? this.mapJsonToWorkspaceQueues(json.queues) : [],
  } as Workspace);

  mapJsonToWorkspaceMember = (json: any) => ({
    id: json?.id,
    member: json?.member,
    status: json?.status,
  } as WorkspaceMember);

  mapJsonToWorkspaceTask = (json: any) => ({
    id: json?.id,
    name: json?.name,
    description: json?.description,
    creator: json?.creator,
  } as WorkspaceTask);

  mapJsonToWorkspaceSchedule = (json: any) => ({
    id: json?.id,
    startDate: moment(json?.startDate).toDate(),
    records: json?.records ? this.mapJsonToWorkspaceScheduleRecords(json?.records) : [],
  } as WorkspaceSchedule);

  mapJsonToWorkspaceScheduleRecord = (json: any) => ({
    id: json?.id,
    description: json?.description,
    startDateTime: moment(json?.startDateTime).toDate(),
    endDateTime: moment(json?.endDateTime).toDate(),
    taskId: json?.taskId,
  } as WorkspaceScheduleRecord);

  mapJsonToWorkspaceQueue = (json: any) => ({
    id: json?.id,
    name: json?.name,
    members: json?.members ? json?.members : [],
  } as WorkspaceQueue);
}

export default new WorkspaceMapper();
