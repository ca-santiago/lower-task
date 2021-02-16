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
exports.Username = void 0;
var Result_1 = require("../../../shared/core/Result");
var ValueObject_1 = require("../../../shared/domain/ValueObject");
var Username = /** @class */ (function (_super) {
    __extends(Username, _super);
    function Username(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Username.prototype, "first", {
        get: function () {
            return this.props.first;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Username.prototype, "last", {
        get: function () {
            return this.props.last;
        },
        enumerable: false,
        configurable: true
    });
    Username.hasValidLength = function (value, min, max) {
        return (value.length <= max &&
            value.length >= min);
    };
    Username.create = function (props) {
        // Test every single name
        var validLenght = this.hasValidLength(props.first.trim(), this.minNameLength, this.maxNameLength);
        if (validLenght === false)
            return Result_1.Result.fail(['Invalid name Lenght']);
        return Result_1.Result.ok(new Username(props));
    };
    Username.maxNameLength = 32;
    Username.minNameLength = 2;
    return Username;
}(ValueObject_1.ValueObject));
exports.Username = Username;
