export interface ICreatedTaskResponse {
  id?: string
  code: string
  taskDescription: string
  taskName: string
  statusId: number
  createdAt?: Date
  updatedAt?: Date
}
