"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var lodash_1 = require("lodash");
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    _id: String,
    name: {
        required: true,
        type: {
            first: String,
            last: String
        }
    },
    email: {
        unique: true, index: true,
        type: String, required: true,
        set: lodash_1.toLower
    },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, required: true },
    createdAt: {
        required: true, type: String
    },
    phoneNumber: {
        required: false,
        type: {
            prefix: String,
            value: Number
        }
    },
    dob: {
        type: String,
    },
    picture: {
        required: false,
        type: {
            baseName: String,
            format: String,
            large: String,
            small: String,
            thumbnail: String,
        }
    },
    bio: {
        type: String, required: true, minlength: 0,
    },
    followers: {
        type: Number, required: true,
    },
    likes: {
        type: Number, required: true,
    }
});
var UserModel = mongoose_1.model('User', UserSchema);
exports.UserModel = UserModel;
