"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUserRepo = void 0;
var user_mapper_1 = require("../mappers/user.mapper");
var mongo_1 = require("./mongo");
var mapper = new user_mapper_1.UserMapper();
var mongoUserRepo = new mongo_1.MongodbRepository(mapper);
exports.mongoUserRepo = mongoUserRepo;
