"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
var Errors_1 = require("../useCases/Errors");
var BaseController = /** @class */ (function () {
    function BaseController() {
    }
    BaseController.prototype.execute = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.executeImpl(req, res)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log("Loggin the error " + err_1);
                        console.trace(err_1);
                        this.fail(res, undefined, 'Internal server error');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.jsonResponse = function (res, code, errors, extraParams) {
        res.status(code).json(__assign({ errors: errors }, extraParams));
    };
    BaseController.prototype.ok = function (res, dto) {
        res.type('application/json');
        BaseController.jsonResponse(res, 200, undefined, dto ? dto : {});
    };
    BaseController.prototype.created = function (res, dto) {
        BaseController.jsonResponse(res, 201, undefined, dto ? dto : {});
    };
    BaseController.prototype.badRequest = function (res, err) {
        BaseController.jsonResponse(res, 400, err, {});
    };
    /**
     * Confict: http 409
     */
    BaseController.prototype.conflict = function (res, message) {
        BaseController.jsonResponse(res, 409, message, {});
    };
    /**
     *
     * @param message A description of the error
     */
    BaseController.prototype.unauthorized = function (res, message) {
        BaseController.jsonResponse(res, 401, undefined, { message: message });
    };
    /**
     * Server Error: http 500
     */
    BaseController.prototype.fail = function (res, errors, errorCode) {
        return res.status(500).json({
            errors: errors,
            error: errorCode
        });
    };
    /**
     *  Http: 404
     */
    BaseController.prototype.notFound = function (res) {
        return BaseController.jsonResponse(res, 404);
    };
    /**
     *
     */
    BaseController.prototype.Unavaliable = function (res, error) {
        return BaseController.jsonResponse(res, 503, error);
    };
    /**
     * 202
     */
    BaseController.prototype.accepted = function (res) {
        return BaseController.jsonResponse(res, 202);
    };
    BaseController.prototype.handleCommonResponse = function (res, result) {
        switch (result.constructor) {
            case Errors_1.UseCasesErrors.InvalidParamError:
                this.badRequest(res, result.error);
                return null;
            case Errors_1.UseCasesErrors.Conflict:
                this.conflict(res, result.error);
                return null;
            case Errors_1.UseCasesErrors.InvalidParamError:
                return null;
            case Errors_1.UseCasesErrors.InvalidParamError:
                return null;
        }
        return result;
    };
    return BaseController;
}());
exports.BaseController = BaseController;
