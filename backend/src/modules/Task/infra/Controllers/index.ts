
import { CreateTaskController } from './CreateTask';

import {
    createTaskUseCase, deleteTaskUseCase, findTaskByContentUseCase,
    updateTaskUseCase, findTaskByOwnerUseCase
} from '../../useCase';
import { DeleteTaskController } from './DeleteTaskController';
import { FindTaskByContentController } from './FindTaskController';
import { UpdateTaskController } from './UpdateTaskController';
import { FindTaskByOwnerController } from './FindByOwnerController';

export const createTaskController = new CreateTaskController(createTaskUseCase);
export const delteTaskController = new DeleteTaskController(deleteTaskUseCase);
export const findTaskByContentController = new FindTaskByContentController(findTaskByContentUseCase);
export const updateTaskController = new UpdateTaskController(updateTaskUseCase);
export const getTasksByOwnerController = new FindTaskByOwnerController(findTaskByOwnerUseCase);
