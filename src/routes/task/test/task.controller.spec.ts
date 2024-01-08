import { Model } from 'mongoose'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { BadRequestException } from '@nestjs/common/exceptions'

import { MongooseHelper } from '../../../utils/test-utils/mongodb-handler'

import { TaskModule } from '../task.module'
import { TaskService } from '../task.service'
import { TaskController } from '../task.controller'
import { Task, TaskDocument, TaskSchema } from '../entities/task.entity'

import { TaskStatusEnum } from '../constants/task-status'

describe('TaskController', () => {
  let controller: TaskController
  let service: TaskService
  const mongodb = MongooseHelper.createServer()
  let app: INestApplication
  const timeOut = 10000

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
      providers: [
        TaskService,
        { provide: getModelToken(Task.name), useValue: taskModel },
      ],
    }).compile()

    service = module.get<TaskService>(TaskService)
    controller = module.get<TaskController>(TaskController)
    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  }, timeOut)

  afterAll(async () => {
    MongooseHelper.disconnect(await mongodb)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getTaskStatus', () => {
    it('should call getTaskStatus on service', () => {
      const getTaskStatus = jest.spyOn(service, 'getTaskStatus')
      controller.getTaskStatus()
      expect(getTaskStatus).toHaveBeenCalled()
    })

    it('should return a list of task status', () => {
      const status = {
        result: [
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
        ],
      }
      expect(controller.getTaskStatus()).toEqual(status)
    })

    it(`should return a code status 200`, async () => {
      const response = await request(app.getHttpServer()).get('/task/status')
      expect(response.status).toEqual(HttpStatus.OK)
    })
  })

  describe('insertTask', () => {
    it(`should be defined`, async () => {
      expect(controller.insertTask).toBeDefined()
    })

    it(`should call insertTask service sending createTaskDTO as parameter`, async () => {
      const body = {
        code: 'ABC',
        taskName: 'Task Name',
        taskDescription: 'Task Description',
      }
      const insertTask = jest.spyOn(service, 'insertTask')
      controller.insertTask(body)
      expect(insertTask).toHaveBeenCalledWith({
        code: body.code,
        taskName: body.taskName,
        taskDescription: body.taskDescription,
      })
    })

    it('Should return an code 400 error and detail if code is already in use', async () => {
      const body = {
        code: 'task-1',
        taskName: 'Task Name',
        taskDescription: 'Task Description',
      }

      await expect(controller.insertTask(body)).rejects.toThrow(
        BadRequestException,
      )
      await expect(controller.insertTask(body)).rejects.toThrow(
        'La tarea task-1 ya existe. Intenta con otro código',
      )
    })

    it(`should return a code status 400 when body isnt send`, async () => {
      const response = await request(app.getHttpServer()).post('/task')
      expect(response.status).toEqual(HttpStatus.BAD_REQUEST)
    })

    it(`should return a detail of task if task is created succesfully`, async () => {
      const task = {
        code: 'ABCD',
        taskName: 'Task Name',
        taskDescription: 'Task Description',
      }
      const response = await request(app.getHttpServer())
        .post('/task')
        .send(task)
      expect(response.body).toMatchObject({
        statusCode: 201,
        message: 'Tarea creada exitosamente',
        data: {
          statusId: TaskStatusEnum.CREATED,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          code: 'ABCD',
          taskName: 'Task Name',
          taskDescription: 'Task Description',
          _id: expect.any(String),
        },
      })
    })
  })

  describe('getTaskByID', () => {
    it('should call getTaskStatus on service', () => {
      const getTaskStatus = jest.spyOn(service, 'getTaskStatus')
      controller.getTaskByID('5c2d57e4a72e8f7843101f30')
      expect(getTaskStatus).toHaveBeenCalled()
    })

    it(`should return a code status 400 when id task not exist`, async () => {
      const response = await request(app.getHttpServer()).get(
        '/task/63b49435e9dc22609c14bcde',
      )
      expect(response.status).toEqual(HttpStatus.BAD_REQUEST)
    })

    it('should return a status, message and task detail', async () => {
      const taskId = '63b49435e9dc22609c14bcda'
      const response = await request(app.getHttpServer()).get(`/task/${taskId}`)
      expect(response.body).toMatchObject({
        statusCode: 200,
        message: 'Tarea encontrada',
        data: {
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
        },
      })
    })
  })

  describe('getFilteredTasks', () => {
    it(`should return a code status 400 when task status not exist`, async () => {
      const response = await request(app.getHttpServer()).get(
        '/task?statusId=4&search=33',
      )
      expect(response.status).toEqual(HttpStatus.BAD_REQUEST)
    })

    it(`should return a HttpStatus.OK if just statusID is sent`, async () => {
      const response = await request(app.getHttpServer()).get(
        '/task?statusId=2',
      )
      expect(response.status).toEqual(HttpStatus.OK)
    })

    it(`should return a HttpStatus.OK if just search is sent`, async () => {
      const response = await request(app.getHttpServer()).get('/task?search=33')
      expect(response.status).toEqual(HttpStatus.OK)
    })

    it(`should return  tasks if  parameters aren't send`, async () => {
      const totalTasksFixtures = 5
      const response = await controller.getFilterTasks({})
      expect(response.result.tasks).toBeInstanceOf(Array)
      expect(response.result.tasks.length).toBeGreaterThanOrEqual(
        totalTasksFixtures,
      )
    })
  })

  describe('updateTask', () => {
    it(`should be defined`, async () => {
      expect(controller.updateTask).toBeDefined()
    })

    it('should return an error if task id is invalid', async () => {
      const response = await request(app.getHttpServer()).put('/task/12345')
      expect(response.status).toEqual(HttpStatus.BAD_REQUEST)
      expect(response.body).toMatchObject({
        error: 'Bad Request',
        message: '12345 is not a valid Mongo ID ',
        statusCode: 400,
      })
    })

    it('should return an error if statusId type is different than number', async () => {
      const body = {
        statusId: '5',
      }
      const response = await request(app.getHttpServer())
        .put('/task/5c2d57e4a72e8f7843101f36')
        .send(body)
      expect(response.body).toMatchObject({
        error: 'Bad Request',
        message: ['statusId must be an integer number'],
        statusCode: 400,
      })
    })

    it('should return an error if statusId is an invalid status', async () => {
      const body = {
        statusId: 5,
      }
      const response = await request(app.getHttpServer())
        .put('/task/5c2d57e4a72e8f7843101f36')
        .send(body)
      expect(response.body).toMatchObject({
        error: 'Bad Request',
        message: 'El estado de la tarea es incorrecto. El id no existe',
        statusCode: 400,
      })
    })

    it('should return an updated task when statusID is valid', async () => {
      const body = {
        statusId: 2,
      }
      const response = await request(app.getHttpServer())
        .put('/task/5c2d57e4a72e8f7843101f33')
        .send(body)
      expect(response.status).toEqual(HttpStatus.OK)
      expect(response.body).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Tarea actualizada',
        data: {
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
        },
      })
    })

    it('should return an  task with Name, Code, Description Updated', async () => {
      const updateTask = {
        taskDescription: 'Leer todos los días',
        code: 'code-213',
      }
      const response = await request(app.getHttpServer())
        .put('/task/5c2d57e4a72e8f7843101f32')
        .send(updateTask)
      expect(response.status).toEqual(HttpStatus.OK)
      expect(response.body).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Tarea actualizada',
        data: {
          id: '5c2d57e4a72e8f7843101f32',
          code: 'code-213',
          taskDescription: 'Leer todos los días',
          taskName: 'task-3-name',
          status: {
            id: TaskStatusEnum.CREATED,
            name: 'Creada',
          },
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      })
    })
  })
})
