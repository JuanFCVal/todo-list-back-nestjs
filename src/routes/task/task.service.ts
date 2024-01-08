/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { TaskStatusEnum, TASK_STATUS } from './constants/task-status';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskDocument } from './entities/task.entity';
import { Model } from 'mongoose';

import { ICreatedTaskResponse } from './interface/created-task-response';
import {
  IResponseTaskById,
  mapTaskDocumentToTaskResponse,
} from './interface/response-task-byid';
import { IFilters } from './interface/filter';
import { IFilterTask } from './interface/filter-task';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { taskStatus, title } from './constants/data';
import axios from 'axios';
@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  url = 'https://graph.facebook.com/v17.0/112412241891382/messages';
  token =
    'EAAIYZCZBeCOZBUBOZC4K69FxrFZBAbuRTHux0p34nVPwHQoUrid9hZCZCEsQB63Ne3dmKoriLajOIhI3QNdZCHsnd0wNnqHxk9gD5eR3f3npZAaXVpZB4kALRUve5yXiAih9RPrMXka6dUW5xuuF3VmljgNEL49r9WFvNrU8LtHLgqYXGwWpvUAwGbHyE9NGlWNkcxLNKP6OciKBealkVyUgM6vRTjcsUZD';

  getStatusById(id: number) {
    const status = TASK_STATUS.find((status) => status.id === id);
    if (!status) {
      throw new BadRequestException(
        `El estado de la tarea es incorrecto. El id no existe`,
      );
    }
    return status;
  }

  getTaskStatus() {
    try {
      return { result: TASK_STATUS };
    } catch (e) {
      throw new InternalServerErrorException(
        'Error al obtener los estados de las tareas',
      );
    }
  }
  async getTaskByCode(createTask: CreateTaskDTO) {
    const task = await this.taskModel.findOne({ code: createTask.code });
    return task;
  }
  async findById(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new BadRequestException(`La tarea no existe`);
    }
    return task;
  }

  async getTaskById(id: string) {
    const task = await this.findById(id);
    return {
      message: 'Tarea encontrada',
      result: mapTaskDocumentToTaskResponse(task),
    };
  }

  async getTasks(filter) {
    return await this.taskModel.find(filter);
  }

  async getFilteredTasks(filters: IFilters) {
    const search = filters.search ?? ' ';
    const { statusId } = filters;
    const filter: IFilterTask = {
      statusId: {},
    };
    if (statusId) {
      this.getStatusById(Number(statusId));
      filter.statusId = { statusId };
    }
    filter.taskName = { $regex: `.*${search}.*` };
    filter.taskDescription = { $regex: `.*${search}.*` };
    const query = {
      $or: [
        { taskName: filter.taskName },
        { taskDescription: filter.taskDescription },
      ],
      $and: [filter.statusId],
    };
    const task = await this.getTasks(query);
    const tasksResponse: IResponseTaskById[] = task.map((task) => {
      return mapTaskDocumentToTaskResponse(task);
    });
    const message =
      tasksResponse.length > 0
        ? 'Tareas encontradas'
        : 'No se encontraron tareas con los parámetros específicados';
    return {
      message,
      result: {
        count: tasksResponse.length,
        tasks: tasksResponse,
      },
    };
  }

  async insertTask(createTask: CreateTaskDTO) {
    const task = await this.getTaskByCode(createTask);
    if (task) {
      throw new BadRequestException(
        `La tarea ${createTask.code} ya existe. Intenta con otro código`,
      );
    }

    const newTask: ICreatedTaskResponse = await this.taskModel.create(
      createTask,
    );
    return {
      message: 'Tarea creada exitosamente',
      result: newTask,
    };
  }

  async updateOneById(taskId, updateTaskDto) {
    const task: TaskDocument = await this.taskModel.findOneAndUpdate(
      { _id: taskId, statusId: { $ne: TaskStatusEnum.FINISHED } },
      {
        $set: updateTaskDto,
      },
      { new: true },
    );
    if (!task) {
      throw new BadRequestException(
        'La tarea está completada, no se puede actualizar su estado',
      );
    }
    return task;
  }

  async updateTask(taskId: string, updateTaskDto: UpdateTaskDTO) {
    const { statusId } = updateTaskDto;
    if (statusId) this.getStatusById(statusId);
    const task: TaskDocument = await this.updateOneById(taskId, updateTaskDto);
    return {
      message: 'Tarea actualizada',
      result: mapTaskDocumentToTaskResponse(task),
    };
  }
  getData() {
    return taskStatus;
  }

  sendWhatsAppMessage() {
    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      messaging_product: 'whatsapp',
      to: '593963610017',
      type: 'template',
      template: {
        name: 'hello_world',
        language: { code: 'en_US' },
      },
    };

    axios
      .post(this.url, data, { headers })
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return {
      message: 'Mensaje enviado',
    };
  }

  handleWebHook(body: any) {
    console.log('handleWebHook', body);
  }
}
