export interface IFilterTask {
    statusId?: {
        statusId?: string;
    };
    taskName?: {
        $regex: string;
    };
    taskDescription?: {
        $regex: string;
    };
}
