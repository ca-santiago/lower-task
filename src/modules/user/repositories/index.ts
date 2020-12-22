
import { UserMapper } from '../mappers/user.mapper';

import { LocalRepo } from './LocalUserRepo';
import { MongodbRepository } from './mongo'

const mapper = new UserMapper();

const userRepo = new LocalRepo(mapper);
const mongoUserRepo = new MongodbRepository(mapper);

export { userRepo, mongoUserRepo };
