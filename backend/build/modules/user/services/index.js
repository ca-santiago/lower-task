"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
var Auth_1 = require("./JWT/Auth");
var authService = new Auth_1.JWTAuthService('akdjla');
exports.authService = authService;
