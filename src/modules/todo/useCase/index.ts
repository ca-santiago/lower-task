
import { CreateTaskUseCase } from './createTask/CreateTaskUseCase'
import { TaskMapper } from '../mapper/TaskMapper'

const mapper = new TaskMapper();

const createTaskUseCase = new CreateTaskUseCase(mapper);

export {
  createTaskUseCase
}