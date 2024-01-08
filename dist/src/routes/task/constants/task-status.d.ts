export declare enum TaskStatusEnum {
    CREATED = 0,
    IN_PROCESS = 1,
    FINISHED = 2
}
export interface IStatus {
    id: TaskStatusEnum;
    name: string;
}
export declare const TASK_STATUS: IStatus[];
