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
exports.Task = void 0;
var Result_1 = require("../../../shared/core/Result");
var AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
var Task = /** @class */ (function (_super) {
    __extends(Task, _super);
    function Task(props, id) {
        return _super.call(this, props, id) || this;
    }
    Object.defineProperty(Task.prototype, "content", {
        get: function () {
            return this.props.content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "title", {
        get: function () {
            return this.props.title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "createAt", {
        get: function () {
            return this.props.createAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "owner", {
        get: function () {
            return this.props.owner;
        },
        enumerable: false,
        configurable: true
    });
    Task.prototype.updateTitle = function (t) {
        this.props.title = t;
        return Result_1.Result.ok();
    };
    Task.prototype.updateContent = function (c) {
        this.props.content = c;
        return Result_1.Result.ok();
    };
    Task.create = function (props, id) {
        return Result_1.Result.ok(new Task(props, id));
    };
    return Task;
}(AggregateRoot_1.AggregateRoot));
exports.Task = Task;
