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
exports.CreateUsernameError = void 0;
var Result_1 = require("../../../../shared/core/Result");
var CreateUsernameError;
(function (CreateUsernameError) {
    var EmailAlreadyExists = /** @class */ (function (_super) {
        __extends(EmailAlreadyExists, _super);
        function EmailAlreadyExists(email) {
            return _super.call(this, false, ["The email " + email + " associated for this account already exists"], null) || this;
        }
        return EmailAlreadyExists;
    }(Result_1.Result));
    CreateUsernameError.EmailAlreadyExists = EmailAlreadyExists;
})(CreateUsernameError = exports.CreateUsernameError || (exports.CreateUsernameError = {}));
