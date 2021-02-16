"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
var Result = /** @class */ (function () {
    function Result(isSuccess, error, value) {
        if (isSuccess && error.length > 0) {
            throw new Error("InvalidOperation: A result cannot be successful and contain an error");
        }
        if (!isSuccess && error.length < 1) {
            throw new Error("InvalidOperation: A failing result needs to contain an error message");
        }
        this.isSuccess = isSuccess;
        this.error = error;
        this._value = value;
        Object.freeze(this);
    }
    Result.prototype.getValue = function () {
        if (!this._value) {
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
        }
        return this._value;
    };
    Result.prototype.errorValue = function () {
        return this.error ? this.error : [];
    };
    Result.ok = function (value) {
        return new Result(true, [], value);
    };
    Result.fail = function (error) {
        return new Result(false, error);
    };
    Result.combine = function (results) {
        var errors = [];
        results.forEach(function (result) {
            if (result.isSuccess === false) {
                errors.push(result.error[0]);
            }
        });
        return errors.length > 0 ? Result.fail(errors) : Result.ok();
    };
    return Result;
}());
exports.Result = Result;
