"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFileRepo = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var LocalFileRepo = /** @class */ (function () {
    function LocalFileRepo(basePath, baseHost, fileStorageName) {
        this.basePath = basePath;
        this.baseHost = baseHost;
        this.fileStorageName = fileStorageName;
    }
    LocalFileRepo.prototype.save = function (file, name, ext) {
        var dirToSave = path_1.default.join(this.basePath, this.fileStorageName);
        var fileAndExt = name + "." + ext;
        var fullPathAndFile = path_1.default.join(dirToSave, fileAndExt);
        fs_1.default.writeFileSync(fullPathAndFile, file);
        return {
            URI: path_1.default.join(this.baseHost, this.fileStorageName, fileAndExt)
        };
    };
    LocalFileRepo.prototype.exist = function (name, ext) {
        throw new Error("Method not implemented.");
    };
    return LocalFileRepo;
}());
exports.LocalFileRepo = LocalFileRepo;
