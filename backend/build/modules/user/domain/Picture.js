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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Picture = void 0;
var Result_1 = require("../../../shared/core/Result");
var ValueObject_1 = require("../../../shared/domain/ValueObject");
var Picture = /** @class */ (function (_super) {
    __extends(Picture, _super);
    function Picture(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Picture.prototype, "format", {
        get: function () {
            return this.props.format;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Picture.prototype, "keyName", {
        get: function () {
            return this.props.keyName;
        },
        enumerable: false,
        configurable: true
    });
    Picture.create = function (props) {
        return Result_1.Result.ok(new Picture(props));
    };
    Picture.prototype.getAccessURL = function (ss) {
        return ss.GetSignedObjectURL(this.keyName);
    };
    return Picture;
}(ValueObject_1.ValueObject));
exports.Picture = Picture;
