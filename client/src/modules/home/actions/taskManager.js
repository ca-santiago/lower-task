
import { TaskManagerConstants } from '../reducers/taskManager';
import { fetchTasksFromUser } from '../services'

export const taskManagerActions = {
  fetchTasks
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
