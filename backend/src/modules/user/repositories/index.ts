
import { UserMapper } from '../mappers/user.mapper';

import { MongodbRepository } from './mongo'

const mapper = new UserMapper();

const mongoUserRepo = new MongodbRepository(mapper);

export { mongoUserRepo };
