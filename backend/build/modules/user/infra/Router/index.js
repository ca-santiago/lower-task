"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = __importDefault(require("express"));
var verifyBearerToken_1 = require("../../../../shared/infra/middlewares/verifyBearerToken");
var controllers_1 = require("../controllers");
var multer_1 = __importDefault(require("multer"));
var UserRouter = express_1.default.Router();
exports.UserRouter = UserRouter;
UserRouter.post('/', function (req, res) { return controllers_1.createUserController.execute(req, res); });
UserRouter.delete('/', verifyBearerToken_1.VerifyHeaderToken, function (req, res) { return controllers_1.deleteUserController.execute(req, res); });
UserRouter.post('/login', function (req, res) { return controllers_1.loginController.execute(req, res); });
UserRouter.put('/picture', verifyBearerToken_1.VerifyHeaderToken, multer_1.default().single('picture'), function (req, res) { return controllers_1.updatePictureController.execute(req, res); });
UserRouter.get('/:id', verifyBearerToken_1.VerifyHeaderToken, function (req, res) { return controllers_1.getUserInfoController.execute(req, res); });
UserRouter.get('/', verifyBearerToken_1.VerifyHeaderToken, function (req, res) { return controllers_1.getUsersProfileController.execute(req, res); });
