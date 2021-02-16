"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Password = void 0;
var Result_1 = require("../../../shared/core/Result");
var Guard_1 = require("../../../shared/core/Guard");
var ValueObject_1 = require("../../../shared/domain/ValueObject");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Represent a valid Password value-object of the User Entity
 */
var Password = /** @class */ (function (_super) {
    __extends(Password, _super);
    function Password(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Password.prototype, "value", {
        get: function () {
            return this.props.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Password.prototype, "isHashed", {
        get: function () {
            return this.props.isHashed;
        },
        enumerable: false,
        configurable: true
    });
    Password.prototype.compare = function (rawPass) {
        return bcryptjs_1.default.compareSync(rawPass, this.value);
    };
    /**
     *  Verify if the rawValue is null, unfined or empty.
     * @param rawPass string
     */
    Password.scan = function (rawPass) {
        var guardResult = Guard_1.Guard.againstNullOrUndefined(rawPass, "password");
        if (!guardResult.isSuccess)
            return Result_1.Result.fail(guardResult.error);
        return Result_1.Result.ok(rawPass);
    };
    /**
     * Chek if the value has a length according to the bussines logic
     * @param password the raw value to validate
     */
    Password.hasValidLength = function (password) {
        return (password.length >= this.minValidPasswordLength &&
            password.length <= this.maxValidPasswordLength);
    };
    /**
     *
     * @param password the raw value
     */
    Password.hashPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcryptjs_1.default.genSalt()];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [2 /*return*/, hashedPassword];
                }
            });
        });
    };
    /**
     * Create a new Password appliying validations
     * @Return Result: contains information about the process wheter is failure or ok
     * @param rawPassword
     */
    Password.create = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!props.isHashed) return [3 /*break*/, 2];
                        // Appliying validations
                        if (!this.hasValidLength(props.value))
                            return [2 /*return*/, Result_1.Result.fail(["Invalid password length"])];
                        // Let's hash it
                        _a = props;
                        return [4 /*yield*/, this.hashPassword(props.value)];
                    case 1:
                        // Let's hash it
                        _a.value = _b.sent();
                        props.isHashed = true;
                        _b.label = 2;
                    case 2: return [2 /*return*/, Result_1.Result.ok(new Password({
                            value: props.value,
                            isHashed: props.isHashed,
                        }))];
                }
            });
        });
    }; // End of create method
    Password.maxValidPasswordLength = 32;
    Password.minValidPasswordLength = 6;
    return Password;
}(ValueObject_1.ValueObject));
exports.Password = Password;
