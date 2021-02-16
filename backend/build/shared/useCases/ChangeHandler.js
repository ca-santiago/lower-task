"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeHandler = void 0;
var Result_1 = require("../core/Result");
var ChangeHandler = /** @class */ (function () {
    function ChangeHandler() {
        this.results = [];
        this.errors = [];
    }
    ChangeHandler.prototype.clean = function () {
        this.results = [];
    };
    ChangeHandler.prototype.addChange = function (r) {
        this.results.push(r);
        if (r.isSuccess === false)
            this.errors.push(r);
    };
    ChangeHandler.prototype.getCombinedResult = function () {
        return Result_1.Result.combine(this.results);
    };
    ChangeHandler.prototype.getErrors = function () {
        return this.errors;
    };
    ChangeHandler.prototype.existError = function () {
        return this.errors.length > 0;
    };
    return ChangeHandler;
}());
exports.ChangeHandler = ChangeHandler;
