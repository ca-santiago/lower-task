"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = exports.saveFile = void 0;
var LocalFileSaver_1 = require("./LocalFileSaver");
var S3_1 = require("./S3");
var config_1 = __importDefault(require("../../../config"));
var _a = process.env, FILE_STORAGE_ACCESS_KEY = _a.FILE_STORAGE_ACCESS_KEY, FILE_STORAGE_SECRET_ACCESS = _a.FILE_STORAGE_SECRET_ACCESS, FILE_STORAGE_ENDPOINT = _a.FILE_STORAGE_ENDPOINT, FILE_STORAGE_NAME = _a.FILE_STORAGE_NAME;
var saveFile = LocalFileSaver_1.makeLocalFileSaver(config_1.default.fileStoragePath);
exports.saveFile = saveFile;
var StorageService = S3_1.makeSaveFileS3({
    accessKey: FILE_STORAGE_ACCESS_KEY,
    secretKey: FILE_STORAGE_SECRET_ACCESS,
    region: undefined, endpoint: FILE_STORAGE_ENDPOINT,
    BucketName: FILE_STORAGE_NAME
});
exports.StorageService = StorageService;
