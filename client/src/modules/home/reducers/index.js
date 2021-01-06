
import { combineReducers } from 'redux';
import { TaskManager } from './taskManager';

export const TaskManagerReducer = combineReducers({
  taskManager: TaskManager
});