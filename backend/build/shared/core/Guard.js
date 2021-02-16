"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
var Result_1 = require("./Result");
var Guard = /** @class */ (function () {
    function Guard() {
    }
    /**
     * Test one argument to verify if it is null or undefined
     * @param argument to be tested
     * @param argumentName
     */
    Guard.againstNullOrUndefined = function (argument, argumentName) {
        if (argument === null || argument === undefined) {
            return Result_1.Result.fail(["Must provide: " + argumentName]);
        }
        else {
            return Result_1.Result.ok(argument);
        }
    };
    /**
     * Receive a collection of guard argument and verify if there is error on them
     * @param args A collection of GuardArguments
     */
    Guard.againstNullOrUndefinedBulk = function (args) {
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            var result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (result.isSuccess === false)
                return result;
        }
        return Result_1.Result.ok();
    };
    Guard.optionalInput = function (value, defa) {
        return this.againstNullOrUndefined(value, '').isSuccess ? value : defa;
    };
    return Guard;
}());
exports.Guard = Guard;
