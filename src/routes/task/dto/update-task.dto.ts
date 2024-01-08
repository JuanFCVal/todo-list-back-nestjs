import { PartialType } from '@nestjs/mapped-types'
import { IsInt, IsOptional } from 'class-validator'
import { CreateTaskDTO } from './create-task.dto'

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @IsInt()
  @IsOptional()
  statusId?: number
}
