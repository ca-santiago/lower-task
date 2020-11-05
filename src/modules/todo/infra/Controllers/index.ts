
import { CreateTaskController } from './CreateTask';

import { createTaskUseCase } from '../../useCase';

const createTaskController = new CreateTaskController(createTaskUseCase);

export {
  createTaskController
}