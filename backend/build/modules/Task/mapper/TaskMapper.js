"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMapper = void 0;
var EntityId_1 = require("../../../shared/domain/EntityId");
var Content_1 = require("../domain/Content");
var Task_1 = require("../domain/Task");
var Tittle_1 = require("../domain/Tittle");
var TaskMapper = /** @class */ (function () {
    function TaskMapper() {
    }
    TaskMapper.prototype.toDomain = function (rawData) {
        var taskId = EntityId_1.EntityId.from(rawData._id).getValue();
        var title = Tittle_1.TaskTitle.create({ value: rawData.title }).getValue();
        var content = Content_1.TaskContent.create({ value: rawData.content }).getValue();
        var owner = EntityId_1.EntityId.from(rawData.owner);
        var createAt = rawData.createdAt;
        var props = {
            content: content, createAt: createAt, title: title,
            owner: owner.getValue()
        };
        return Task_1.Task.create(props, taskId).getValue();
    };
    TaskMapper.prototype.toPersistence = function (domain) {
        var out = {
            content: domain.content.props.value,
            createdAt: domain.createAt,
            _id: domain.id.value, owner: domain.owner.value,
            title: domain.title.value,
        };
        return out;
    };
    TaskMapper.prototype.toDTO = function (domain) {
        var _a;
        var taskMapped = {
            createAt: domain.createAt,
            id: domain.id.value, owner: domain.owner.value,
            title: domain.title.props.value,
            content: (_a = domain.content) === null || _a === void 0 ? void 0 : _a.props.value,
        };
        return taskMapped;
    };
    return TaskMapper;
}());
exports.TaskMapper = TaskMapper;
