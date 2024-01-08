import { ObjectID } from 'mongodb'

module.exports = [
  {
    _id: new ObjectID('5c2d57e4a72e8f7843101f30'),
    code: 'task-1',
    taskDescription: 'task-1-description',
    taskName: 'task-1-name',
    statusId: 1,
    updatedAt: new Date('2023-01-03T20:46:45.521Z'),
    createdAt: new Date('2023-01-03T20:46:45.521Z'),
  },
  {
    _id: new ObjectID('5c2d57e4a72e8f7843101f31'),
    code: 'task-2',
    taskDescription: 'task-2-description',
    taskName: 'task-2-name',
    statusId: 2,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    _id: new ObjectID('5c2d57e4a72e8f7843101f32'),
    code: 'task-3',
    taskDescription: 'task-3-description',
    taskName: 'task-3-name',
    statusId: 0,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    _id: new ObjectID('63b49435e9dc22609c14bcda'),
    code: 'task-9',
    taskDescription: 'task-9-description',
    taskName: 'task-9-name',
    statusId: 0,
    updatedAt: new Date('2023-01-03T20:46:45.521Z'),
    createdAt: new Date('2023-01-03T20:46:45.521Z'),
  },
  {
    _id: new ObjectID('5c2d57e4a72e8f7843101f33'),
    code: 'reading-1',
    taskDescription:
      'Leer el libro clean code en el transcurso de un mes. Segmentando cada capitulo en 3 partes.',
    taskName: 'Leer libro clean code',
    statusId: 0,
    updatedAt: new Date('2023-01-03T20:46:45.521Z'),
    createdAt: new Date('2023-01-03T20:46:45.521Z'),
  },
  {
    _id: new ObjectID('5c2d57e4a72e8f7843101f34'),
    code: 'homework-1',
    taskDescription:
      'Resolver tarea de matematicas de la semana 1 del curso de Ingeniería',
    taskName: 'Resolver tarea de matematicas aplicada a la Ingeniería',
    statusId: 1,
    updatedAt: new Date('2023-01-03T20:46:45.521Z'),
    createdAt: new Date('2023-01-03T20:46:45.521Z'),
  },
  {
    _id: new ObjectID('5c2d57e4a72e8f7843101f35'),
    code: 'study-1',
    taskDescription:
      'estudiar para el examen de matematicas de la semana 1 del curso de matematicas aplicada a la Ingeniería',
    taskName: 'Estudiar para el examen de matematicas',
    statusId: 1,
    updatedAt: new Date('2023-01-03T20:46:45.521Z'),
    createdAt: new Date('2023-01-03T20:46:45.521Z'),
  },
  {
    _id: new ObjectID('5c2d57e4a72e8f7843101f36'),
    code: 'estudiar-14',
    taskDescription:
      'estudiar para el examen de literatura de la semana 2 del curso de literatura ecuatoriana',
    taskName: 'Estudiar para el examen de matematicas',
    statusId: 2,
    updatedAt: new Date('2023-01-03T20:46:45.521Z'),
    createdAt: new Date('2023-01-03T20:46:45.521Z'),
  },
]
