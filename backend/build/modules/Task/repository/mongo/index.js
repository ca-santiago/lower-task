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
exports.MongooseTaskRepo = void 0;
var Result_1 = require("../../../../shared/core/Result");
var model_1 = require("./model");
var MongooseTaskRepo = /** @class */ (function () {
    function MongooseTaskRepo(mapper) {
        this.mapper = mapper;
    }
    MongooseTaskRepo.prototype.exist = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.TaskModel.exists({ _id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseTaskRepo.prototype.save = function (t) {
        return __awaiter(this, void 0, void 0, function () {
            var mappedTask, upsetData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        mappedTask = this.mapper.toPersistence(t);
                        upsetData = __assign({}, mappedTask);
                        return [4 /*yield*/, model_1.TaskModel.findByIdAndUpdate(t.id.value, upsetData, { upsert: true }).exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok()];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, Result_1.Result.fail([err_1.message])];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongooseTaskRepo.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.TaskModel.findByIdAndDelete(id.value).exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongooseTaskRepo.prototype.findByTitleOrContent = function (regex, options) {
        return __awaiter(this, void 0, void 0, function () {
            var RE, results, mappedTask;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        RE = new RegExp(regex, 'i');
                        return [4 /*yield*/, model_1.TaskModel.find({ $or: [{ title: RE }, { content: RE }], $and: [{ owner: options.ownerId }] }).exec()];
                    case 1:
                        results = _a.sent();
                        mappedTask = results.map(function (theTask) { return _this.mapper.toDomain(theTask); });
                        return [2 /*return*/, mappedTask];
                }
            });
        });
    };
    MongooseTaskRepo.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, mapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.TaskModel.findOne({ _id: id.value })];
                    case 1:
                        res = _a.sent();
                        if (!res)
                            return [2 /*return*/, null];
                        mapped = this.mapper.toDomain(res);
                        return [2 /*return*/, mapped];
                }
            });
        });
    };
    MongooseTaskRepo.prototype.findByOwner = function (ownerId) {
        return __awaiter(this, void 0, void 0, function () {
            var out, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.TaskModel.find({ owner: ownerId }).exec()];
                    case 1:
                        res = _a.sent();
                        out = res.map(function (theTask) { return _this.mapper.toDomain(theTask); });
                        return [2 /*return*/, out];
                }
            });
        });
    };
    return MongooseTaskRepo;
}());
exports.MongooseTaskRepo = MongooseTaskRepo;
