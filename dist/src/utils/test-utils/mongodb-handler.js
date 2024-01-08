"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseHelper = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose = require("mongoose");
const Fixtures = require("node-mongodb-fixtures");
class MongooseHelper {
}
exports.MongooseHelper = MongooseHelper;
_a = MongooseHelper;
MongooseHelper.createServer = async () => await mongodb_memory_server_1.MongoMemoryServer.create();
MongooseHelper.setup = async (mongoServer) => {
    const uri = mongoServer.getUri();
    const fixtures = new Fixtures({
        dir: `${__dirname}/fixtures/`,
        filter: '.*',
        mute: true,
    });
    await fixtures
        .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => fixtures.unload())
        .then(() => fixtures.load())
        .catch()
        .finally(() => fixtures.disconnect());
    await mongoose.connect(uri);
    return uri;
};
MongooseHelper.disconnect = async (mongoServer) => {
    await mongoose.disconnect();
    return mongoServer.stop();
};
//# sourceMappingURL=mongodb-handler.js.map