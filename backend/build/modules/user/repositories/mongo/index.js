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
exports.MongodbRepository = void 0;
// Entities class
var user_model_1 = require("./user.model");
var MongodbRepository = /** @class */ (function () {
    function MongodbRepository(mapper) {
        this.mapper = mapper;
    }
    /**
     * Search by user email
     * @param userEmail
     */
    MongodbRepository.prototype.exists = function (ObjecId) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.find({ '$or': [{ email: ObjecId }, { _id: ObjecId }] })];
                    case 1:
                        exists = _a.sent();
                        return [2 /*return*/, exists.length > 0];
                }
            });
        });
    };
    MongodbRepository.prototype.getUserByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.findOne({ _id: userId })];
                    case 1:
                        exists = _a.sent();
                        return [2 /*return*/, exists ? this.mapper.toDomain(exists) : null];
                }
            });
        });
    };
    MongodbRepository.prototype.getUserByEmail = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.findOne({ email: userEmail })];
                    case 1:
                        exists = _a.sent();
                        return [2 /*return*/, exists ? this.mapper.toDomain(exists) : null];
                }
            });
        });
    };
    MongodbRepository.prototype.getUserByUserName = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    MongodbRepository.prototype.save = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var upsetData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        upsetData = __assign({}, user);
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(user.id, upsetData, { upsert: true }).exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongodbRepository.prototype.delete = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                user_model_1.UserModel.deleteOne({ _id: userId }).exec();
                return [2 /*return*/];
            });
        });
    };
    MongodbRepository.prototype.getMany = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, mapUser;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserModel.find().exec()];
                    case 1:
                        data = _a.sent();
                        mapUser = function (theUser) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.mapper.toDomain(theUser)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); };
                        return [2 /*return*/, Promise.all(data.map(mapUser))];
                }
            });
        });
    };
    return MongodbRepository;
}());
exports.MongodbRepository = MongodbRepository;
