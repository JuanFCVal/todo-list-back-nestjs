import { IStatus } from '../constants/task-status';
import { TaskDocument } from '../entities/task.entity';
export interface IResponseTaskById {
    id: string;
    code: string;
    status: IStatus;
    taskName: string;
    taskDescription: string;
    createdAt: string;
    updatedAt: string;
}
export declare const mapTaskDocumentToTaskResponse: (task: TaskDocument) => IResponseTaskById;
