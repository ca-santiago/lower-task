
import { TaskMapper } from '../mapper/TaskMapper';
import { MongooseTaskRepo } from './mongo';

const taskMapper = new TaskMapper();

const mongoRepo = new MongooseTaskRepo(taskMapper);

const taskRepo = mongoRepo;

export {
  taskRepo,
  mongoRepo,
}
