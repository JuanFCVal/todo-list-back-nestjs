/* eslint-disable prettier/prettier */
import { ParseMongoIdPipe } from './../../pipes/parse-mongo-id/parse-mongo-id.pipe';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';

import { IFilters } from './interface/filter';
import { TaskResponseInterceptor } from './interceptors/response.interceptor';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('task')
@UseInterceptors(TaskResponseInterceptor)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get('/status')
  @HttpCode(HttpStatus.OK)
  getTaskStatus() {
    return this.taskService.getTaskStatus();
  }
  @Get('/whatsapp')
  sendWhatsAppMessage() {
    console.log('sendWhatsAppMessage');
    return this.taskService.sendWhatsAppMessage();
  }
  @Post('/webhook')
  async webhook(@Body() body: any) {
    console.log('webhook', body);
    return this.taskService.handleWebHook(body);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTaskByID(@Param('id', ParseMongoIdPipe) id: string) {
    return this.taskService.getTaskById(id);
  }

  @Get('')
  async getFilterTasks(@Query() filters: IFilters) {
    return this.taskService.getFilteredTasks(filters);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async insertTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.taskService.insertTask(createTaskDTO);
  }
  @Put(':id')
  updateTask(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ) {
    return this.taskService.updateTask(id, updateTaskDTO);
  }
}
