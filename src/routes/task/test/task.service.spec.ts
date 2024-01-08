import { Model } from 'mongoose'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { ObjectID } from 'mongodb'
import { BadRequestException } from '@nestjs/common/exceptions'

import { MongooseHelper } from '../../../utils/test-utils/mongodb-handler'

import { Task, TaskDocument, TaskSchema } from '../entities/task.entity'
import { TaskModule } from '../task.module'
import { TaskService } from '../task.service'
import { TaskController } from '../task.controller'

import { TASK_STATUS, TaskStatusEnum } from '../constants/task-status'

describe('TaskService', () => {
  const timeOut = 10000
  let service: TaskService
  const mongodb = MongooseHelper.createServer()
  let app: INestApplication

  beforeAll(async () => {
    const mongoUri = await MongooseHelper.setup(await mongodb)
    let taskModel: Model<TaskDocument>
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TaskModule,
        MongooseModule.forRoot(mongoUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
      ],
      controllers: [TaskController],
      providers: [
        TaskService,
        { provide: getModelToken(Task.name), useValue: taskModel },
      ],
    }).compile()

    service = module.get<TaskService>(TaskService)
    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  }, timeOut)

  afterAll(async () => {
    MongooseHelper.disconnect(await mongodb)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getTaskStatus', () => {
    it('should status const have 3 status', () => {
      const statusNumber = 3
      expect(TASK_STATUS).toHaveLength(statusNumber)
    })
  })

  describe('insertTask', () => {
    it('should be defined', () => {
      expect(service.insertTask).toBeDefined()
    })

    it('should receive a createTaskDTO', async () => {
      const task = {
        code: 'ABC',
        taskName: 'Task Name',
        taskDescription: 'Task Description',
      }
      const insertTask = jest.spyOn(service, 'insertTask')
      service.insertTask(task)
      expect(insertTask).toHaveBeenLastCalledWith({
        code: expect.any(String),
        taskName: expect.any(String),
        taskDescription: expect.any(String),
      })
    })

    it('should return a task detail with status, updatedAt, createdAt', async () => {
      const task = {
        code: 'ABCD',
        taskName: 'Task Name',
        taskDescription: 'Task Description',
      }
      const value = await service.insertTask(task)
      expect(value.message).toBe('Tarea creada exitosamente')
      expect(value.result).toMatchObject({
        statusId: TaskStatusEnum.CREATED,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        code: 'ABCD',
        taskName: 'Task Name',
        taskDescription: 'Task Description',
        _id: expect.any(ObjectID),
      })
    })

    it('should return a BadRequestException if task code is already in use', async () => {
      const task = {
        code: 'task-1',
        taskName: 'Task Name',
        taskDescription: 'Task Description',
      }
      await expect(service.insertTask(task)).rejects.toThrow(
        BadRequestException,
      )
    })
  })

  describe('getTaskById', () => {
    it('should be defined', () => {
      expect(service.getTaskById).toBeDefined()
    })

    it('should return a Bad request if task id not exist', async () => {
      const taskId = '5c2d57e4a72d8f7843101f30'
      await expect(service.getTaskById(taskId)).rejects.toThrow(
        BadRequestException,
      )
      await expect(service.getTaskById(taskId)).rejects.toThrow(
        `La tarea no existe`,
      )
    })

    it('should return a status, message and task detail', async () => {
      const taskId = '63b49435e9dc22609c14bcda'
      const response = await service.getTaskById(taskId)
      expect(response.message).toBe('Tarea encontrada')
      expect(response.result).toMatchObject({
        id: '63b49435e9dc22609c14bcda',
        code: 'task-9',
        taskDescription: 'task-9-description',
        taskName: 'task-9-name',
        status: {
          id: TaskStatusEnum.CREATED,
          name: 'Creada',
        },
        createdAt: '03-01-2023, 15:46',
        updatedAt: '03-01-2023, 15:46',
      })
    })
  })

  describe('getFilteredTasks', () => {
    it('should be defined', () => {
      expect(service.getFilteredTasks).toBeDefined()
    })

    it('should throw an error if status is invalid', async () => {
      const filter = {
        statusId: '5',
      }
      const secondFilter = {
        statusId: 'hola',
      }

      await expect(() => service.getFilteredTasks(filter)).rejects.toThrow(
        BadRequestException,
      )
      await expect(() =>
        service.getFilteredTasks(secondFilter),
      ).rejects.toThrow(BadRequestException)
    })

    it('should return only tasks with  statusId', async () => {
      const filter = {
        statusId: '0',
      }
      const tasks = await service.getFilteredTasks(filter)
      expect(
        tasks.result.tasks.every(
          (task) => task.status.id === parseInt(filter.statusId),
        ),
      ).toBe(true)
    })

    it('should return only tasks that contains"estudiar" on name or description', async () => {
      const filter = {
        search: 'estudiar',
      }
      const tasks = await service.getFilteredTasks(filter)
      expect(
        tasks.result.tasks.every(
          (task) =>
            task.taskName.includes(filter.search) ||
            task.taskDescription.includes(filter.search),
        ),
      ).toBe(true)
    })

    it('should return  tasks that contains "estudiar" on name or description and got specific status ID', async () => {
      const filter = {
        search: 'estudiar',
        statusId: '0',
      }
      const tasks = await service.getFilteredTasks(filter)
      expect(
        tasks.result.tasks.every(
          (task) =>
            (task.taskName.includes(filter.search) ||
              task.taskDescription.includes(filter.search)) &&
            task.status.id === parseInt(filter.statusId),
        ),
      ).toBe(true)
    })
  })

  describe('updateTask', () => {
    it('should be defined', () => {
      expect(service.updateTask).toBeDefined()
    })

    it('should return an error if status ID is invalid', async () => {
      const taskId = '5c2d57e4a72d8f7843101f30'
      const updateTask = {
        statusId: 5,
      }
      await expect(service.updateTask(taskId, updateTask)).rejects.toThrow(
        BadRequestException,
      )
      await expect(service.updateTask(taskId, updateTask)).rejects.toThrow(
        'El estado de la tarea es incorrecto. El id no existe',
      )
    })

    it('should return an error if status ID is equal to completed', async () => {
      const taskId = '5c2d57e4a72e8f7843101f36'
      const updateTask = {
        statusId: 2,
      }
      await expect(service.updateTask(taskId, updateTask)).rejects.toThrow(
        BadRequestException,
      )
      await expect(service.updateTask(taskId, updateTask)).rejects.toThrow(
        `La tarea está completada, no se puede actualizar su estado`,
      )
    })

    it('should return an updated task', async () => {
      const taskId = '5c2d57e4a72e8f7843101f33'
      const updateTask = {
        statusId: TaskStatusEnum.FINISHED,
      }
      const response = await service.updateTask(taskId, updateTask)
      expect(response.result).toMatchObject({
        id: '5c2d57e4a72e8f7843101f33',
        code: 'reading-1',
        taskDescription:
          'Leer el libro clean code en el transcurso de un mes. Segmentando cada capitulo en 3 partes.',
        taskName: 'Leer libro clean code',
        status: {
          id: TaskStatusEnum.FINISHED,
          name: 'Finalizada',
        },
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    })

    it('should return an error if statusId does not belong to the constants', async () => {
      const id = '5c2d57e4a72e8f7843101f33'
      const updateTask = {
        statusId: 4,
      }
      await expect(service.updateTask(id, updateTask)).rejects.toThrow(
        BadRequestException,
      )
      await expect(service.updateTask(id, updateTask)).rejects.toThrow(
        'El estado de la tarea es incorrecto. El id no existe',
      )
    })

    it('should return an error if Task Is Already Finished', async () => {
      const id = '5c2d57e4a72e8f7843101f36'
      const updateTask = {
        statusId: TaskStatusEnum.FINISHED,
      }
      const updateTaskFunction = () => service.updateTask(id, updateTask)
      await expect(updateTaskFunction).rejects.toThrow(BadRequestException)
      await expect(updateTaskFunction).rejects.toThrow(
        'La tarea está completada, no se puede actualizar su estado',
      )
    })

    it('should return an updated task with updated Status', async () => {
      const id = '5c2d57e4a72e8f7843101f30'
      const responseBeforeUpdate = await service.getTaskById(id)
      expect(responseBeforeUpdate).toEqual({
        message: 'Tarea encontrada',
        result: {
          code: 'task-1',
          createdAt: '03-01-2023, 15:46',
          id: '5c2d57e4a72e8f7843101f30',
          status: { id: 1, name: 'En proceso' },
          taskDescription: 'task-1-description',
          taskName: 'task-1-name',
          updatedAt: expect.any(String),
        },
      })
      const updateTask = {
        statusId: TaskStatusEnum.FINISHED,
      }
      const response = await service.updateTask(id, updateTask)
      expect(response).toEqual({
        message: 'Tarea actualizada',
        result: {
          code: 'task-1',
          createdAt: '03-01-2023, 15:46',
          id: '5c2d57e4a72e8f7843101f30',
          status: { id: 2, name: 'Finalizada' },
          taskDescription: 'task-1-description',
          taskName: 'task-1-name',
          updatedAt: expect.any(String),
        },
      })
    })

    it('should return an updated task with updated Name, Code, Description, Status', async () => {
      const id = '5c2d57e4a72e8f7843101f34'
      const responseBeforeUpdate = await service.getTaskById(id)
      expect(responseBeforeUpdate).toEqual({
        message: 'Tarea encontrada',
        result: {
          code: 'homework-1',
          createdAt: '03-01-2023, 15:46',
          id: '5c2d57e4a72e8f7843101f34',
          status: { id: 1, name: 'En proceso' },
          taskDescription:
            'Resolver tarea de matematicas de la semana 1 del curso de Ingeniería',
          taskName: 'Resolver tarea de matematicas aplicada a la Ingeniería',
          updatedAt: expect.any(String),
        },
      })
      const updateTask = {
        statusId: TaskStatusEnum.FINISHED,
        taskName: 'Leer clean code',
        taskDescription: 'Segmentar libro y leer',
        code: 'reading-33',
      }
      const response = await service.updateTask(id, updateTask)
      expect(response).toEqual({
        message: 'Tarea actualizada',
        result: {
          code: 'reading-33',
          createdAt: '03-01-2023, 15:46',
          id: '5c2d57e4a72e8f7843101f34',
          status: { id: 2, name: 'Finalizada' },
          taskDescription: 'Segmentar libro y leer',
          taskName: 'Leer clean code',
          updatedAt: expect.any(String),
        },
      })
    })

    it('should return an updated task with updated Description and Code', async () => {
      const id = '63b49435e9dc22609c14bcda'
      const updateTask = {
        taskDescription: 'Leer todos los días',
        code: 'reading-213',
      }
      const response = await service.updateTask(id, updateTask)
      expect(response).toEqual({
        message: 'Tarea actualizada',
        result: {
          code: 'reading-213',
          createdAt: '03-01-2023, 15:46',
          id: '63b49435e9dc22609c14bcda',
          status: { id: 0, name: 'Creada' },
          taskDescription: 'Leer todos los días',
          taskName: 'task-9-name',
          updatedAt: expect.any(String),
        },
      })
    })
  })
})
