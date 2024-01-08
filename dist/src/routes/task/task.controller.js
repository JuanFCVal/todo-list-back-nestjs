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
exports.TaskController = void 0;
const parse_mongo_id_pipe_1 = require("./../../pipes/parse-mongo-id/parse-mongo-id.pipe");
const common_1 = require("@nestjs/common");
const enums_1 = require("@nestjs/common/enums");
const create_task_dto_1 = require("./dto/create-task.dto");
const task_service_1 = require("./task.service");
const response_interceptor_1 = require("./interceptors/response.interceptor");
const update_task_dto_1 = require("./dto/update-task.dto");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    getTaskStatus() {
        return this.taskService.getTaskStatus();
    }
    sendWhatsAppMessage() {
        console.log('sendWhatsAppMessage');
        return this.taskService.sendWhatsAppMessage();
    }
    getTaskByID(id) {
        return this.taskService.getTaskById(id);
    }
    async getFilterTasks(filters) {
        return this.taskService.getFilteredTasks(filters);
    }
    async insertTask(createTaskDTO) {
        return this.taskService.insertTask(createTaskDTO);
    }
    updateTask(id, updateTaskDTO) {
        return this.taskService.updateTask(id, updateTaskDTO);
    }
};
__decorate([
    (0, common_1.Get)('/status'),
    (0, common_1.HttpCode)(enums_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getTaskStatus", null);
__decorate([
    (0, common_1.Get)('/whatsapp'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "sendWhatsAppMessage", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(enums_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', parse_mongo_id_pipe_1.ParseMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getTaskByID", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getFilterTasks", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(enums_1.HttpStatus.ACCEPTED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "insertTask", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_mongo_id_pipe_1.ParseMongoIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDTO]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "updateTask", null);
TaskController = __decorate([
    (0, common_1.Controller)('task'),
    (0, common_1.UseInterceptors)(response_interceptor_1.TaskResponseInterceptor),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map