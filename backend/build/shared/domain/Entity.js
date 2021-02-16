"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
var EntityId_1 = require("./EntityId");
var Entity = /** @class */ (function () {
    function Entity(props, id) {
        this._id = id ? id : EntityId_1.EntityId.new();
        this.props = props;
    }
    return Entity;
}());
exports.Entity = Entity;
