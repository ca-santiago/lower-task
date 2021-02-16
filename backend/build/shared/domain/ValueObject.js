"use strict";
/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
var ValueObject = /** @class */ (function () {
    function ValueObject(props) {
        this.props = props;
    }
    Object.defineProperty(ValueObject.prototype, "raw", {
        get: function () {
            return Object.freeze(this.props);
        },
        enumerable: false,
        configurable: true
    });
    ValueObject.prototype.equals = function (vo) {
        if (vo.props === undefined || vo.props === null) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    };
    return ValueObject;
}());
exports.ValueObject = ValueObject;
