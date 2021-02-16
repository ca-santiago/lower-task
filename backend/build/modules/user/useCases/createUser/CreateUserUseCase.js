"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
var Result_1 = require("../../../../shared/core/Result");
var Email_1 = require("../../domain/Email");
var Password_1 = require("../../domain/Password");
var Username_1 = require("../../domain/Username");
var CreateUserErrors_1 = require("./CreateUserErrors");
var User_1 = require("../../domain/User");
var Errors_1 = require("../../../../shared/useCases/Errors");
var Guard_1 = require("../../../../shared/core/Guard");
var moment_1 = __importDefault(require("moment"));
var CreateUser = /** @class */ (function () {
    function CreateUser(userRepo, mapper) {
        this.userRepo = userRepo;
        this.mapper = mapper;
    }
    CreateUser.prototype.run = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, username, emailGuardResult, passwordGuardResult, usernameGuardResult, lastNameWithDefault, emailOrError, passwordOrError, usernameOrError, dtoResult, email_1, password_1, username_1, userExistResult, userOrError, userPersistenDTO, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.email, password = request.password, username = request.username;
                        emailGuardResult = Guard_1.Guard.againstNullOrUndefined(email, 'email');
                        passwordGuardResult = Guard_1.Guard.againstNullOrUndefined(password, 'password');
                        usernameGuardResult = Guard_1.Guard.againstNullOrUndefined(username === null || username === void 0 ? void 0 : username.name, 'username -> name');
                        lastNameWithDefault = Guard_1.Guard.optionalInput(username === null || username === void 0 ? void 0 : username.last, '');
                        Result_1.Result.combine([
                            emailGuardResult, passwordGuardResult,
                            usernameGuardResult
                        ]);
                        if (!usernameGuardResult.isSuccess)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.InvalidParamError(usernameGuardResult.error)];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        emailOrError = Email_1.Email.create({ value: request.email });
                        return [4 /*yield*/, Password_1.Password.create({ value: request.password, isHashed: false })];
                    case 2:
                        passwordOrError = _a.sent();
                        usernameOrError = Username_1.Username.create({
                            first: request.username.name,
                            last: lastNameWithDefault
                        });
                        dtoResult = Result_1.Result.combine([
                            emailOrError, passwordOrError, usernameOrError
                        ]);
                        if (dtoResult.isSuccess == false)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.InvalidParamError(dtoResult.error)];
                        email_1 = emailOrError.getValue();
                        password_1 = passwordOrError.getValue();
                        username_1 = usernameOrError.getValue();
                        return [4 /*yield*/, this.userRepo.exists(email_1.value)];
                    case 3:
                        userExistResult = _a.sent();
                        if (userExistResult)
                            return [2 /*return*/, new CreateUserErrors_1.CreateUsernameError.EmailAlreadyExists(email_1.value)];
                        userOrError = User_1.User.create({
                            email: email_1, password: password_1, username: username_1,
                            isEmailVerified: false, picture: null,
                            createdAt: moment_1.default().format(),
                        });
                        if (userOrError.isSuccess == false)
                            return [2 /*return*/, Result_1.Result.fail(userOrError.error)];
                        userPersistenDTO = this.mapper.toPersistence(userOrError.getValue());
                        return [4 /*yield*/, this.userRepo.save(userPersistenDTO)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok()];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, Result_1.Result.fail(err_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }; // End of the run method
    return CreateUser;
}());
exports.CreateUser = CreateUser;
