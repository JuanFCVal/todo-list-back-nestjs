"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseMongoIdPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const exceptions_1 = require("@nestjs/common/exceptions");
let ParseMongoIdPipe = class ParseMongoIdPipe {
    transform(value) {
        return new Promise((resolve, reject) => {
            if ((0, mongoose_1.isValidObjectId)(value)) {
                resolve(value);
            }
            else {
                reject(new exceptions_1.BadRequestException(`${value} is not a valid Mongo ID `));
            }
        });
    }
};
ParseMongoIdPipe = __decorate([
    (0, common_1.Injectable)()
], ParseMongoIdPipe);
exports.ParseMongoIdPipe = ParseMongoIdPipe;
//# sourceMappingURL=parse-mongo-id.pipe.js.map