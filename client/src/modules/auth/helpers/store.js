
import { applyMiddleware, createStore } from 'redux';
import { AuthReducer } from '../reducers';
import thunk from 'redux-thunk';

const AuthStore = createStore(
  AuthReducer,
  applyMiddleware(
    thunk
  )
);

export { AuthStore };