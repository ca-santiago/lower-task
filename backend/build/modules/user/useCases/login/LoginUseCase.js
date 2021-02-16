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
exports.LoginUseCase = void 0;
var Result_1 = require("../../../../shared/core/Result");
var Email_1 = require("../../domain/Email");
var Password_1 = require("../../domain/Password");
var Errors_1 = require("../../../../shared/useCases/Errors");
var Guard_1 = require("../../../../shared/core/Guard");
var LoginUseCase = /** @class */ (function () {
    function LoginUseCase(repo, mapper, authService) {
        this.repo = repo;
        this.mapper = mapper;
        this.authService = authService;
    }
    LoginUseCase.prototype.run = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, emailGuardResult, passGuardResult, combienGuardResult, emailOrError, passwordOrError, combineResult, userOrError, user, toDTO, payload, token, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.email, password = request.password;
                        emailGuardResult = Guard_1.Guard.againstNullOrUndefined(email, 'email');
                        passGuardResult = Guard_1.Guard.againstNullOrUndefined(password, 'password');
                        combienGuardResult = Result_1.Result.combine([
                            emailGuardResult, passGuardResult
                        ]);
                        if (combienGuardResult.isSuccess == false)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.InvalidParamError(combienGuardResult.error)];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        emailOrError = Email_1.Email.create({ value: email });
                        passwordOrError = Password_1.Password.scan(password);
                        combineResult = Result_1.Result.combine([emailOrError, passwordOrError]);
                        if (combineResult.isSuccess === false)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.InvalidParamError(combineResult.error)];
                        return [4 /*yield*/, this.repo.getUserByEmail(emailOrError.getValue().value)];
                    case 2:
                        userOrError = _a.sent();
                        if (!userOrError)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.NotFound()];
                        user = userOrError;
                        if (!user.password.compare(password)) {
                            return [2 /*return*/, new Errors_1.UseCasesErrors.InvalidCredentials()];
                        }
                        toDTO = this.mapper.toDTO(user);
                        payload = this.mapper.toTokenPayload(toDTO);
                        return [4 /*yield*/, this.authService.sign(payload)];
                    case 3:
                        token = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(__assign({ token: token }, toDTO))];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, Result_1.Result.fail(err_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return LoginUseCase;
}());
exports.LoginUseCase = LoginUseCase;
