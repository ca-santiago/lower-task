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
exports.Email = void 0;
var Result_1 = require("../../../shared/core/Result");
var ValueObject_1 = require("../../../shared/domain/ValueObject");
/**
 * Represent a valid Email value-object of the User Entity
 */
var Email = /** @class */ (function (_super) {
    __extends(Email, _super);
    function Email(value) {
        return _super.call(this, value) || this;
    }
    Object.defineProperty(Email.prototype, "value", {
        get: function () {
            return this.props.value;
        },
        enumerable: false,
        configurable: true
    });
    Email.isValidEmail = function (email) {
        return this.regExEmail.test(email);
    };
    Email.create = function (props) {
        if (!this.isValidEmail(props.value))
            return Result_1.Result.fail(['Email address not valid']);
        return Result_1.Result.ok(new Email(props));
    };
    Email.regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Email;
}(ValueObject_1.ValueObject));
exports.Email = Email;
