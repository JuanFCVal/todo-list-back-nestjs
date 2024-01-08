import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskDocument } from './entities/task.entity';
import { Model } from 'mongoose';
import { ICreatedTaskResponse } from './interface/created-task-response';
import { IResponseTaskById } from './interface/response-task-byid';
import { IFilters } from './interface/filter';
import { UpdateTaskDTO } from './dto/update-task.dto';
export declare class TaskService {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    getStatusById(id: number): import("./constants/task-status").IStatus;
    getTaskStatus(): {
        result: import("./constants/task-status").IStatus[];
    };
    getTaskByCode(createTask: CreateTaskDTO): Promise<Task & Required<{
        _id: string;
    }>>;
    findById(id: string): Promise<Task & Required<{
        _id: string;
    }>>;
    getTaskById(id: string): Promise<{
        message: string;
        result: IResponseTaskById;
    }>;
    getTasks(filter: any): Promise<(Task & Required<{
        _id: string;
    }>)[]>;
    getFilteredTasks(filters: IFilters): Promise<{
        message: string;
        result: {
            count: number;
            tasks: IResponseTaskById[];
        };
    }>;
    insertTask(createTask: CreateTaskDTO): Promise<{
        message: string;
        result: ICreatedTaskResponse;
    }>;
    updateOneById(taskId: any, updateTaskDto: any): Promise<Task & Required<{
        _id: string;
    }>>;
    updateTask(taskId: string, updateTaskDto: UpdateTaskDTO): Promise<{
        message: string;
        result: IResponseTaskById;
    }>;
    getData(): string[];
    sendWhatsAppMessage(): {
        message: string;
    };
}
