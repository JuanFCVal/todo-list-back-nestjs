import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { IFilters } from './interface/filter';
import { UpdateTaskDTO } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getTaskStatus(): {
        result: import("./constants/task-status").IStatus[];
    };
    sendWhatsAppMessage(): {
        message: string;
    };
    getTaskByID(id: string): Promise<{
        message: string;
        result: import("./interface/response-task-byid").IResponseTaskById;
    }>;
    getFilterTasks(filters: IFilters): Promise<{
        message: string;
        result: {
            count: number;
            tasks: import("./interface/response-task-byid").IResponseTaskById[];
        };
    }>;
    insertTask(createTaskDTO: CreateTaskDTO): Promise<{
        message: string;
        result: import("./interface/created-task-response").ICreatedTaskResponse;
    }>;
    updateTask(id: string, updateTaskDTO: UpdateTaskDTO): Promise<{
        message: string;
        result: import("./interface/response-task-byid").IResponseTaskById;
    }>;
}
