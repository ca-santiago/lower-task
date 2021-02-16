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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
var User_1 = require("../domain/User");
var Email_1 = require("../domain/Email");
var Password_1 = require("../domain/Password");
var Username_1 = require("../domain/Username");
var Result_1 = require("../../../shared/core/Result");
var EntityId_1 = require("../../../shared/domain/EntityId");
var Picture_1 = require("../domain/Picture");
var moment_1 = __importDefault(require("moment"));
var UserMapper = /** @class */ (function () {
    function UserMapper() {
    }
    UserMapper.prototype.toDomain = function (rawData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, first, last, email, password, username, id, picture;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = rawData.name, first = _a.first, last = _a.last;
                        email = Email_1.Email.create({ value: rawData.email });
                        return [4 /*yield*/, Password_1.Password.create({ value: rawData.password, isHashed: true })];
                    case 1:
                        password = _b.sent();
                        username = Username_1.Username.create({
                            first: first,
                            last: last ? last : '',
                        });
                        id = EntityId_1.EntityId.from(rawData.id);
                        picture = null;
                        if (rawData.picture) {
                            picture = Picture_1.Picture.create({
                                format: rawData.picture.format,
                                keyName: rawData.picture.keyName,
                            }).getValue();
                        }
                        return [2 /*return*/, User_1.User.create({
                                email: email.getValue(),
                                password: password.getValue(),
                                username: username.getValue(),
                                isEmailVerified: rawData.isEmailVerified,
                                picture: picture,
                                createdAt: rawData.createdAt,
                            }, id.getValue()).getValue()];
                }
            });
        });
    };
    ;
    UserMapper.prototype.toPersistence = function (user) {
        return {
            name: {
                first: user.username.first,
                last: user.username.last,
            },
            email: user.email.value,
            password: user.password.value,
            isEmailVerified: user.isEmailVerfied,
            createdAt: user.createdAt,
            id: user.id.value,
            picture: user.picture ? {
                keyName: user.picture.keyName,
                format: user.picture.format,
            } : null,
        };
    };
    ;
    UserMapper.prototype.toDTO = function (user) {
        var _a;
        var picture = ((_a = user.picture) === null || _a === void 0 ? void 0 : _a.raw) ? user.picture.raw : undefined;
        return {
            name: {
                first: user.username.first,
                last: user.username.last,
            },
            email: user.email.value, createdAt: user.createdAt,
            isEmailVerified: user.isEmailVerfied,
            id: user.id.value,
            profilePicture: picture,
        };
    };
    ;
    UserMapper.prototype.toTokenPayload = function (raw) {
        var payload = {
            email: raw.email,
            userId: raw.id,
            isEmailVerified: raw.isEmailVerified,
            username: __assign({}, raw.name)
        };
        return payload;
    };
    UserMapper.prototype.mapToEditableProps = function (rawData, user) {
        return __awaiter(this, void 0, void 0, function () {
            var usernameOrError, pictureOrError, isDate, combineResult, username, picture, bio, out;
            return __generator(this, function (_a) {
                usernameOrError = Username_1.Username.create({
                    first: rawData.username.first,
                    last: rawData.username.last
                });
                pictureOrError = Picture_1.Picture.create({
                    format: rawData.picture.format,
                    keyName: rawData.keyName
                });
                isDate = moment_1.default.isDate(rawData.dob);
                combineResult = Result_1.Result.combine([
                    usernameOrError
                ]);
                username = usernameOrError.isSuccess ?
                    usernameOrError.getValue() : user.username;
                picture = pictureOrError.isSuccess ?
                    pictureOrError.getValue() : user.picture;
                bio = rawData.bio;
                out = {
                    username: username,
                    picture: picture,
                };
                return [2 /*return*/, Result_1.Result.ok(out)];
            });
        });
    };
    return UserMapper;
}());
exports.UserMapper = UserMapper;
