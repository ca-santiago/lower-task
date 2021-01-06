

export const TaskManagerConstants = {
  FETCH_TASKS_REQUEST: 'FETCH_TASKS_REQUEST',
  FETCH_TASKS_FAIL: 'FETCH_TASKS_FAIL',
  FETCH_SUCCEEDED: 'FETCH_SUCCEEDED',

  RESET_TASK_MANAGER: 'RESET_TASK_MANAGER',
}

const initialState = {
  fetching: false,
  tasks: []
}

export function TaskManager(state = initialState, action) {
  switch (action.type) {
    case TaskManagerConstants.FETCH_TASKS_REQUEST:
      return Object.freeze({
        ...state,
        fetching: true
      })
    case TaskManagerConstants.FETCH_TASKS_FAIL:
      return Object.freeze({
        ...state,
        fetching: false,
        errors: ['Error pidiendo las tareas xD']
      })
    case TaskManagerConstants.FETCH_SUCCEEDED:
      return {
        ...state,
        fetching: false,
        tasks: [...state.tasks, ...action.tasks]
      }
    case TaskManagerConstants.RESET_TASK_MANAGER:
      return initialState;
    default:
      return state;
  }
}
