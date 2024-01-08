"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const exceptions_1 = require("@nestjs/common/exceptions");
const task_status_1 = require("./constants/task-status");
const task_entity_1 = require("./entities/task.entity");
const mongoose_2 = require("mongoose");
const response_task_byid_1 = require("./interface/response-task-byid");
const data_1 = require("./constants/data");
const axios_1 = require("axios");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    getStatusById(id) {
        const status = task_status_1.TASK_STATUS.find((status) => status.id === id);
        if (!status) {
            throw new exceptions_1.BadRequestException(`El estado de la tarea es incorrecto. El id no existe`);
        }
        return status;
    }
    getTaskStatus() {
        try {
            return { result: task_status_1.TASK_STATUS };
        }
        catch (e) {
            throw new exceptions_1.InternalServerErrorException('Error al obtener los estados de las tareas');
        }
    }
    async getTaskByCode(createTask) {
        const task = await this.taskModel.findOne({ code: createTask.code });
        return task;
    }
    async findById(id) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new exceptions_1.BadRequestException(`La tarea no existe`);
        }
        return task;
    }
    async getTaskById(id) {
        const task = await this.findById(id);
        return {
            message: 'Tarea encontrada',
            result: (0, response_task_byid_1.mapTaskDocumentToTaskResponse)(task),
        };
    }
    async getTasks(filter) {
        return await this.taskModel.find(filter);
    }
    async getFilteredTasks(filters) {
        var _a;
        const search = (_a = filters.search) !== null && _a !== void 0 ? _a : ' ';
        const { statusId } = filters;
        const filter = {
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
        const tasksResponse = task.map((task) => {
            return (0, response_task_byid_1.mapTaskDocumentToTaskResponse)(task);
        });
        const message = tasksResponse.length > 0
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
    async insertTask(createTask) {
        const task = await this.getTaskByCode(createTask);
        if (task) {
            throw new exceptions_1.BadRequestException(`La tarea ${createTask.code} ya existe. Intenta con otro código`);
        }
        const newTask = await this.taskModel.create(createTask);
        return {
            message: 'Tarea creada exitosamente',
            result: newTask,
        };
    }
    async updateOneById(taskId, updateTaskDto) {
        const task = await this.taskModel.findOneAndUpdate({ _id: taskId, statusId: { $ne: task_status_1.TaskStatusEnum.FINISHED } }, {
            $set: updateTaskDto,
        }, { new: true });
        if (!task) {
            throw new exceptions_1.BadRequestException('La tarea está completada, no se puede actualizar su estado');
        }
        return task;
    }
    async updateTask(taskId, updateTaskDto) {
        const { statusId } = updateTaskDto;
        if (statusId)
            this.getStatusById(statusId);
        const task = await this.updateOneById(taskId, updateTaskDto);
        return {
            message: 'Tarea actualizada',
            result: (0, response_task_byid_1.mapTaskDocumentToTaskResponse)(task),
        };
    }
    getData() {
        return data_1.taskStatus;
    }
    sendWhatsAppMessage() {
        const url = 'https://graph.facebook.com/v17.0/112412241891382/messages';
        const token = 'EAAIYZCZBeCOZBUBOZC4K69FxrFZBAbuRTHux0p34nVPwHQoUrid9hZCZCEsQB63Ne3dmKoriLajOIhI3QNdZCHsnd0wNnqHxk9gD5eR3f3npZAaXVpZB4kALRUve5yXiAih9RPrMXka6dUW5xuuF3VmljgNEL49r9WFvNrU8LtHLgqYXGwWpvUAwGbHyE9NGlWNkcxLNKP6OciKBealkVyUgM6vRTjcsUZD';
        const headers = {
            Authorization: `Bearer ${token}`,
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
        axios_1.default
            .post(url, data, { headers })
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
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_entity_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map