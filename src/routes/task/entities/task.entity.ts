import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'
import { TaskStatusEnum } from '../constants/task-status'

export type TaskDocument = HydratedDocument<Task>
@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ unique: true, required: true })
  code: string
  @Prop({ required: true })
  taskDescription: string
  @Prop({ required: true })
  taskName: string
  @Prop({ type: Number, enum: TaskStatusEnum, default: TaskStatusEnum.CREATED })
  statusId: TaskStatusEnum

  _id: string
  createdAt: Date
  updatedAt: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)
