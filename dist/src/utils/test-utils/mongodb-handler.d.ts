import { MongoMemoryServer } from 'mongodb-memory-server';
export declare class MongooseHelper {
    static createServer: () => Promise<MongoMemoryServer>;
    static setup: (mongoServer: MongoMemoryServer) => Promise<string>;
    static disconnect: (mongoServer: MongoMemoryServer) => Promise<boolean>;
}
