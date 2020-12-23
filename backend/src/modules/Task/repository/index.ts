
import { TaskMapper } from '../mapper/TaskMapper';
import { LocalTaskRepo } from './local'
import { MongooseTaskRepo } from './mongo';

const taskMapper = new TaskMapper();

const mongoRepo = new MongooseTaskRepo(taskMapper);
const localTaskRepo = new LocalTaskRepo(taskMapper);

const taskRepo = mongoRepo;

export {
  taskRepo,
  mongoRepo,
  localTaskRepo
}
