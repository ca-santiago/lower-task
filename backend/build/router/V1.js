"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Router_1 = __importDefault(require("../modules/Task/infra/Router"));
var Router_2 = require("../modules/user/infra/Router");
var RouterV1 = express_1.Router();
RouterV1.use('/tasks', Router_1.default);
RouterV1.use('/users', Router_2.UserRouter);
exports.default = RouterV1;
