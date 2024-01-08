export enum TaskStatusEnum {
  CREATED,
  IN_PROCESS,
  FINISHED,
}
export interface IStatus {
  id: TaskStatusEnum
  name: string
}

export const TASK_STATUS: IStatus[] = [
  {
    id: TaskStatusEnum.CREATED,
    name: 'Creada',
  },
  {
    id: TaskStatusEnum.IN_PROCESS,
    name: 'En proceso',
  },
  {
    id: TaskStatusEnum.FINISHED,
    name: 'Finalizada',
  },
]
