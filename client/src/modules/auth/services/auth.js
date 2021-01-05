
import { AuthAPI } from "../../../shared/config/API"

const portOrBlank = AuthAPI.PORT && `:${AuthAPI.PORT}`
const baseURL = `${AuthAPI.PROTOCOL}://${AuthAPI.HOST}${portOrBlank}/api/v1`

export const authService = {
  SignIn,
  SignUp
}


async function SignIn({ email, password }) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }
  console.log('Pre to fetch 2')
  return fetch(`${baseURL}/users/login`, options)
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

  return fetch(`${baseURL}/users`, options).then(handleResponse)
}

function handleResponse(res) {

  console.log('[Handler]')
  console.log(res)

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
