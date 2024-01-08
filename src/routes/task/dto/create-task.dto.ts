import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  code: string
  @IsString()
  @IsNotEmpty()
  taskName: string
  @IsString()
  @IsNotEmpty()
  taskDescription: string
}
