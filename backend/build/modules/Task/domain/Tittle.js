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
exports.TaskTitle = void 0;
var Result_1 = require("../../../shared/core/Result");
var ValueObject_1 = require("../../../shared/domain/ValueObject");
var TaskTitle = /** @class */ (function (_super) {
    __extends(TaskTitle, _super);
    function TaskTitle(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(TaskTitle.prototype, "value", {
        get: function () {
            return this.props.value;
        },
        enumerable: false,
        configurable: true
    });
    TaskTitle.create = function (props) {
        if (props.value.length > TaskTitle.maxTitleLenght)
            return Result_1.Result.fail(['Invalida task title lenght']);
        return Result_1.Result.ok(new TaskTitle(props));
    };
    TaskTitle.maxTitleLenght = 240;
    return TaskTitle;
}(ValueObject_1.ValueObject));
exports.TaskTitle = TaskTitle;
