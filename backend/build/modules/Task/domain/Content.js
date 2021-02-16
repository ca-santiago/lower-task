"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskContent = void 0;
var Result_1 = require("../../../shared/core/Result");
var ValueObject_1 = require("../../../shared/domain/ValueObject");
var TaskContent = /** @class */ (function (_super) {
    __extends(TaskContent, _super);
    function TaskContent(props) {
        return _super.call(this, props) || this;
    }
    TaskContent.create = function (props) {
        if (props.value.length > TaskContent.maxTaskContentLenght)
            return Result_1.Result.fail(['Invalid task content lenght']);
        return Result_1.Result.ok(new TaskContent(props));
    };
    TaskContent.maxTaskContentLenght = 1024;
    return TaskContent;
}(ValueObject_1.ValueObject));
exports.TaskContent = TaskContent;
