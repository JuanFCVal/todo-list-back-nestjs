import { CreateTaskDTO } from './create-task.dto';
declare const UpdateTaskDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTaskDTO>>;
export declare class UpdateTaskDTO extends UpdateTaskDTO_base {
    statusId?: number;
}
export {};
