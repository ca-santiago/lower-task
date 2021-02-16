"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRepo = void 0;
var config_1 = __importDefault(require("../../config"));
var LocalFileRepo_1 = require("./LocalFileRepo");
var fileRepo = new LocalFileRepo_1.LocalFileRepo(config_1.default.baseDir, config_1.default.baseHost, config_1.default.fileStorageName);
exports.fileRepo = fileRepo;
