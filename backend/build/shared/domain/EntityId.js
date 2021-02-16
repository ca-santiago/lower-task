"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityId = void 0;
var uuid_1 = require("uuid");
var Result_1 = require("../core/Result");
var validate = require('uuid-validate');
var EntityId = /** @class */ (function () {
    function EntityId(value) {
        this.value = value;
    }
    EntityId.new = function () {
        var uuid = uuid_1.v4();
        return new EntityId(uuid);
    };
    /**
     * Create an Entity id from value.
     * Validate the rawId and return a new EntityId instance
     * @param value rawId
     */
    EntityId.from = function (value) {
        if (validate(value) === false)
            return Result_1.Result.fail(['Invalid given entity id']);
        return Result_1.Result.ok(new EntityId(value));
    };
    return EntityId;
}());
exports.EntityId = EntityId;
