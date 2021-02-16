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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskUseCase = void 0;
var Guard_1 = require("../../../../shared/core/Guard");
var Result_1 = require("../../../../shared/core/Result");
var EntityId_1 = require("../../../../shared/domain/EntityId");
var Errors_1 = require("../../../../shared/useCases/Errors");
var Content_1 = require("../../domain/Content");
var Tittle_1 = require("../../domain/Tittle");
var UpdateTaskUseCase = /** @class */ (function () {
    function UpdateTaskUseCase(taskRepo) {
        this.taskRepo = taskRepo;
    }
    UpdateTaskUseCase.prototype.run = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var content, title, userId, taskId, contentOrDefault, titleOrDefault, taskIdOrError, TaskOrError, contentInstance, titleInstace, combieResult, updateContentResult, updateTitleResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = request.content, title = request.title, userId = request.userId, taskId = request.taskId;
                        contentOrDefault = Guard_1.Guard.optionalInput(content, '');
                        titleOrDefault = Guard_1.Guard.optionalInput(title, '');
                        if (contentOrDefault === '' && titleOrDefault === '')
                            return [2 /*return*/, new Errors_1.UseCasesErrors.Conflict(['Should provide title or content.'])];
                        taskIdOrError = EntityId_1.EntityId.from(taskId);
                        if (taskIdOrError.isSuccess === false)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.NotFound()];
                        return [4 /*yield*/, this.taskRepo.findById(taskIdOrError.getValue())];
                    case 1:
                        TaskOrError = _a.sent();
                        if (!TaskOrError)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.NotFound()];
                        // Validate task owner or have permisions
                        if (TaskOrError.id.value !== userId)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.Unauthorized()];
                        contentInstance = Content_1.TaskContent.create({ value: contentOrDefault });
                        titleInstace = Tittle_1.TaskTitle.create({ value: titleOrDefault });
                        combieResult = Result_1.Result.combine([contentInstance, titleInstace]);
                        if (combieResult.isSuccess === false)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.InvalidParamError(combieResult.error)];
                        updateContentResult = TaskOrError.updateContent(contentInstance.getValue());
                        updateTitleResult = TaskOrError.updateTitle(titleInstace.getValue());
                        // Looking for conflicts
                        combieResult = Result_1.Result.combine([updateContentResult, updateTitleResult]);
                        if (combieResult.isSuccess === false)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.Conflict(combieResult.error)];
                        // saving changes
                        this.taskRepo.save(TaskOrError);
                        return [2 /*return*/, Result_1.Result.ok()];
                }
            });
        });
    };
    return UpdateTaskUseCase;
}());
exports.UpdateTaskUseCase = UpdateTaskUseCase;
