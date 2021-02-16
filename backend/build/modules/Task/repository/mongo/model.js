"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var TaskSchemaDef = {
    _id: String,
    content: String,
    createdAt: String,
    title: String,
    owner: String,
};
var TaskSchema = new mongoose_1.default.Schema(TaskSchemaDef);
exports.TaskModel = mongoose_1.default.model('Task', TaskSchema);
