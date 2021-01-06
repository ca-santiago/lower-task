import { TaskAPI } from "../../../shared/config/API"

const portOrEmpty = TaskAPI.PORT && `:${TaskAPI.PORT}`
const baseURL = `${TaskAPI.PROTOCOL}://${TaskAPI.HOST}${portOrEmpty}/api/v1/tasks`

export {
  fetchTasksFromUser
}

function fetchTasksFromUser(userId, token) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseURL}/owner/${userId}`, options)
    .then(handleResponse);
}

function handleResponse(res) {
  // console.log('[Handler]')
  // console.log(res)
  if (res.status === 200) {
    return res.json();
  }
  if (res.status === 400) {
    return res.json().then(data => {
      return Promise.reject({ status: res.status, errors: data.errors })
    })
  }

  if (res.status === 404)
    return Promise.reject({ status: res.status });
}