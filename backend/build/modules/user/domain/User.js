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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
var Result_1 = require("../../../shared/core/Result");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(props, id) {
        return _super.call(this, props, id) || this;
    }
    Object.defineProperty(User.prototype, "username", {
        get: function () {
            return this.props.username;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this.props.password;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this.props.email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "isEmailVerfied", {
        get: function () {
            return this.props.isEmailVerified;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "createdAt", {
        get: function () {
            return this.props.createdAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "picture", {
        get: function () {
            return this.props.picture;
        },
        enumerable: false,
        configurable: true
    });
    User.create = function (props, id) {
        var newUser = new User(__assign({}, props), id);
        if (!!id === false) {
            newUser.setVerifiedEmail(false);
        }
        return Result_1.Result.ok(newUser);
    };
    User.prototype.updateData = function (data) {
        this.props = __assign(__assign({}, this.props), data);
        return this;
    };
    User.prototype.updateSensibleData = function (data) {
        this.props = __assign(__assign({}, this.props), data);
        return this;
    };
    User.prototype.setVerifiedEmail = function (option) {
        this.props.isEmailVerified = option;
    };
    User.prototype.updatePicture = function (picture) {
        this.props.picture = picture;
    };
    return User;
}(AggregateRoot_1.AggregateRoot));
exports.User = User;
