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
exports.UploadProfilePictureUseCase = void 0;
var Guard_1 = require("../../../../shared/core/Guard");
var Result_1 = require("../../../../shared/core/Result");
var FileSaver_1 = require("../../../../shared/services/FileSaver");
var ImageResizer_1 = require("../../../../shared/services/ImageResizer");
var Errors_1 = require("../../../../shared/useCases/Errors");
var Picture_1 = require("../../domain/Picture");
var moment_1 = __importDefault(require("moment"));
var jimp_1 = __importDefault(require("jimp"));
var UploadProfilePictureUseCase = /** @class */ (function () {
    function UploadProfilePictureUseCase(userRepo, mapper, FileStorageService) {
        this.userRepo = userRepo;
        this.mapper = mapper;
        this.FileStorageService = FileStorageService;
    }
    UploadProfilePictureUseCase.prototype.run = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var guardPictureResult, userId, user, fileName, newPicture, pictureInstance, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        guardPictureResult = Guard_1.Guard.againstNullOrUndefined(request.file, 'picture');
                        if (guardPictureResult.isSuccess === false)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.InvalidParamError(guardPictureResult.error)];
                        userId = request.userId;
                        return [4 /*yield*/, this.userRepo.getUserByUserId(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, new Errors_1.UseCasesErrors.Unauthorized()];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        fileName = user.id.value + "--" + moment_1.default().format() + ".png";
                        return [4 /*yield*/, this.uploadFile(fileName, guardPictureResult.getValue())];
                    case 3:
                        _a.sent();
                        newPicture = Picture_1.Picture.create({
                            format: jimp_1.default.MIME_PNG,
                            keyName: fileName,
                        });
                        pictureInstance = newPicture.getValue();
                        user.updatePicture(pictureInstance);
                        this.userRepo.save(this.mapper.toPersistence(user));
                        return [2 /*return*/, Result_1.Result.ok()];
                    case 4:
                        err_1 = _a.sent();
                        console.log("[ServerError] " + err_1);
                        return [2 /*return*/, Result_1.Result.fail(['500'])];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UploadProfilePictureUseCase.prototype.uploadFile = function (fileName, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.FileStorageService.SaveFile(data, fileName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UploadProfilePictureUseCase.prototype.processFile = function (data, size, baseName) {
        return __awaiter(this, void 0, void 0, function () {
            var h, w, resizedFile, fullName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        h = size.h, w = size.w;
                        return [4 /*yield*/, ImageResizer_1.resizeImage(data, { h: h, w: w })];
                    case 1:
                        resizedFile = _a.sent();
                        fullName = baseName + (h + "x" + w) + '.png';
                        FileSaver_1.saveFile(resizedFile, fullName);
                        return [2 /*return*/, fullName];
                }
            });
        });
    };
    return UploadProfilePictureUseCase;
}());
exports.UploadProfilePictureUseCase = UploadProfilePictureUseCase;
