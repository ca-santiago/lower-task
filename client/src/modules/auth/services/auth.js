
import { AuthAPI } from "../../../shared/config/API"

export const authService = {
  SignIn,
  SignUp
}


function SignIn({ email, password }) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }
  return fetch(`http://localhost:3003/api/v1/users/login`, options)
    .then(handleResponse);
}

async function SignUp({ username, password, email }) {

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, email })
  }

  return fetch(`${AuthAPI.URL}/api/v1/users`, options)
}

function handleResponse(res) {
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
