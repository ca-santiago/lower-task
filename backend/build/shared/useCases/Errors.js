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
exports.UseCasesErrors = void 0;
var Result_1 = require("../core/Result");
var UseCasesErrors;
(function (UseCasesErrors) {
    var InvalidParamError = /** @class */ (function (_super) {
        __extends(InvalidParamError, _super);
        function InvalidParamError(msg) {
            return _super.call(this, false, msg, null) || this;
        }
        return InvalidParamError;
    }(Result_1.Result));
    UseCasesErrors.InvalidParamError = InvalidParamError;
    var Unauthorized = /** @class */ (function (_super) {
        __extends(Unauthorized, _super);
        function Unauthorized() {
            return _super.call(this, false, ['Unauthorized'], null) || this;
        }
        return Unauthorized;
    }(Result_1.Result));
    UseCasesErrors.Unauthorized = Unauthorized;
    var InvalidCredentials = /** @class */ (function (_super) {
        __extends(InvalidCredentials, _super);
        function InvalidCredentials() {
            return _super.call(this, false, ['Invalid credentials'], null) || this;
        }
        return InvalidCredentials;
    }(Result_1.Result));
    UseCasesErrors.InvalidCredentials = InvalidCredentials;
    var NotFound = /** @class */ (function (_super) {
        __extends(NotFound, _super);
        function NotFound() {
            return _super.call(this, false, ['Not found'], null) || this;
        }
        return NotFound;
    }(Result_1.Result));
    UseCasesErrors.NotFound = NotFound;
    var DataBaseConnection = /** @class */ (function (_super) {
        __extends(DataBaseConnection, _super);
        function DataBaseConnection() {
            return _super.call(this, false, ['Database is down'], null) || this;
        }
        return DataBaseConnection;
    }(Result_1.Result));
    UseCasesErrors.DataBaseConnection = DataBaseConnection;
    var Conflict = /** @class */ (function (_super) {
        __extends(Conflict, _super);
        function Conflict(errors) {
            return _super.call(this, false, errors, null) || this;
        }
        return Conflict;
    }(Result_1.Result));
    UseCasesErrors.Conflict = Conflict;
})(UseCasesErrors = exports.UseCasesErrors || (exports.UseCasesErrors = {}));
