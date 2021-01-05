
import { CreateTaskUseCase } from './createTask/UseCase'
import { TaskMapper } from '../mapper/TaskMapper'
import { mongoRepo } from '../repository';
import { DeleteTaskUseCase } from './deleteTask/UseCase';
import { FindTaskByContentUseCase } from './FindByContent/UseCase'
import { UpdateTaskUseCase } from './updateTask/UseCase';
import { GetTasksByOwnerUseCase } from './FindByOwner/UseCase';

const mapper = new TaskMapper();

export const createTaskUseCase = new CreateTaskUseCase(mapper, mongoRepo);
export const deleteTaskUseCase = new DeleteTaskUseCase(mongoRepo);
export const findTaskByContentUseCase = new FindTaskByContentUseCase(mongoRepo, mapper);
export const updateTaskUseCase = new UpdateTaskUseCase(mongoRepo);
export const findTaskByOwnerUseCase = new GetTasksByOwnerUseCase(mongoRepo, mapper);
