
import { TaskManagerConstants } from '../reducers/taskManager';
import { fetchTasksFromUser, createTask } from '../services'

export const taskManagerActions = {
  fetchTasks, createNewTask
}


function fetchTasks(userId, token) {
  return (dispatch) => {
    dispatch({ type: TaskManagerConstants.FETCH_TASKS_REQUEST });

    return fetchTasksFromUser(userId, token)
      .then(data => {
        setTimeout(() => {
          dispatch({ type: TaskManagerConstants.FETCH_SUCCEEDED, tasks: Object.values(data) })
        }, [1000])
      })
      .catch(err => {
        console.log('[ActionErr]')
        console.log(err)

        dispatch({ type: TaskManagerConstants.FETCH_TASKS_FAIL, errors: err });
      });
  }
}


function createNewTask(title, content, token) {
  return dispatch => {
    dispatch({ type: TaskManagerConstants.CREATE_TASK_REQUEST });

    return createTask(title, content, token)
      .then(data => {
        console.log(data);
        dispatch({ type: TaskManagerConstants.CREATE_TASK_SUCCEEDED, data });
      })
      .catch(err => {
        // TODO: Save the task on the draft memory.
        dispatch({ type: TaskManagerConstants.CREATE_TASK_FAIL, errors: ['No sé pudo crear el ToDo, intentelo más tarde.'] });
      })
  }
}
