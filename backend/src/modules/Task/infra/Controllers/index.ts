
import { CreateTaskController } from './CreateTask';

import { createTaskUseCase, deleteTaskUseCase, findTaskByContentUseCase } from '../../useCase';
import { DeleteTaskController } from './DeleteTaskController';
import { FindTaskByContentController } from './FindTaskController';

export const createTaskController = new CreateTaskController(createTaskUseCase);
export const delteTaskController = new DeleteTaskController(deleteTaskUseCase);
export const findTaskByContentController = new FindTaskByContentController(findTaskByContentUseCase);
