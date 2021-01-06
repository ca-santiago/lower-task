
import { applyMiddleware, createStore } from 'redux';
import { TaskManagerReducer } from '../reducers';
import thunk from 'redux-thunk';

const TaskManagerStore = createStore(
  TaskManagerReducer,
  applyMiddleware(
    thunk
  )
);

export { TaskManagerStore };