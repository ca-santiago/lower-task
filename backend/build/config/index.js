"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var baseDir = path_1.default.join(__dirname, '../../');
/**
 * File storage name -> Based on the baseDir path.
 * this path is added at the end of baseDir
 */
var fileStorageName = 'file-storage';
var fileStoragePath = path_1.default.join(baseDir, fileStorageName);
var baseHost = '';
var config = {
    baseDir: baseDir,
    baseHost: baseHost,
    fileStorageName: fileStorageName,
    fileStoragePath: fileStoragePath
};
exports.default = config;
