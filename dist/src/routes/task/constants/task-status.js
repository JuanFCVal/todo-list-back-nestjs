"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASK_STATUS = exports.TaskStatusEnum = void 0;
var TaskStatusEnum;
(function (TaskStatusEnum) {
    TaskStatusEnum[TaskStatusEnum["CREATED"] = 0] = "CREATED";
    TaskStatusEnum[TaskStatusEnum["IN_PROCESS"] = 1] = "IN_PROCESS";
    TaskStatusEnum[TaskStatusEnum["FINISHED"] = 2] = "FINISHED";
})(TaskStatusEnum = exports.TaskStatusEnum || (exports.TaskStatusEnum = {}));
exports.TASK_STATUS = [
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
];
//# sourceMappingURL=task-status.js.map