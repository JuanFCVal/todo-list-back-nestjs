"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTaskDocumentToTaskResponse = void 0;
const task_status_1 = require("../constants/task-status");
const transform_1 = require("../../../utils/transform");
const mapTaskDocumentToTaskResponse = (task) => {
    return {
        id: task.id,
        code: task.code,
        status: task_status_1.TASK_STATUS.find((status) => status.id === task.statusId),
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        createdAt: transform_1.Transform.transformDDMMYYYY(task.createdAt),
        updatedAt: transform_1.Transform.transformDDMMYYYY(task.updatedAt),
    };
};
exports.mapTaskDocumentToTaskResponse = mapTaskDocumentToTaskResponse;
//# sourceMappingURL=response-task-byid.js.map