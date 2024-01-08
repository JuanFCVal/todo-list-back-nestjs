"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 20:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskController = void 0;
const parse_mongo_id_pipe_1 = __webpack_require__(21);
const common_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(22);
const create_task_dto_1 = __webpack_require__(23);
const task_service_1 = __webpack_require__(11);
const filter_1 = __webpack_require__(25);
const response_interceptor_1 = __webpack_require__(26);
const update_task_dto_1 = __webpack_require__(28);
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
    async webhook(body) {
        console.log('webhook', body);
        return this.taskService.handleWebHook(body);
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
    (0, common_1.Post)('/webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "webhook", null);
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
    __metadata("design:paramtypes", [typeof (_b = typeof filter_1.IFilters !== "undefined" && filter_1.IFilters) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getFilterTasks", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(enums_1.HttpStatus.ACCEPTED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_task_dto_1.CreateTaskDTO !== "undefined" && create_task_dto_1.CreateTaskDTO) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "insertTask", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_mongo_id_pipe_1.ParseMongoIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof update_task_dto_1.UpdateTaskDTO !== "undefined" && update_task_dto_1.UpdateTaskDTO) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "updateTask", null);
TaskController = __decorate([
    (0, common_1.Controller)('task'),
    (0, common_1.UseInterceptors)(response_interceptor_1.TaskResponseInterceptor),
    __metadata("design:paramtypes", [typeof (_a = typeof task_service_1.TaskService !== "undefined" && task_service_1.TaskService) === "function" ? _a : Object])
], TaskController);
exports.TaskController = TaskController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8dd1a5a37f9395ec495a")
/******/ })();
/******/ 
/******/ }
;