import { IStatus, TASK_STATUS } from '../constants/task-status'
import { TaskDocument } from '../entities/task.entity'
import { Transform } from '../../../utils/transform'

export interface IResponseTaskById {
  id: string
  code: string
  status: IStatus
  taskName: string
  taskDescription: string
  createdAt: string
  updatedAt: string
}

export const mapTaskDocumentToTaskResponse = (
  task: TaskDocument,
): IResponseTaskById => {
  return {
    id: task.id,
    code: task.code,
    status: TASK_STATUS.find((status) => status.id === task.statusId),
    taskName: task.taskName,
    taskDescription: task.taskDescription,
    createdAt: Transform.transformDDMMYYYY(task.createdAt),
    updatedAt: Transform.transformDDMMYYYY(task.updatedAt),
  }
}
