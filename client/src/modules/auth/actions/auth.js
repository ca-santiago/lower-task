
import { authConstants } from '../constants';
import { authService } from '../services'

export const authActions = {
  SignIn,
  SignOut,
}

function SignIn({ email, pass }) {
  return (dispatch) => {
    return authService.SignIn({ email, password: pass })
      .then(data => {
        const payload = JSON.stringify({ ...data });
        localStorage.setItem(authConstants.AUTH_KEY, payload);
        dispatch({ type: authConstants.LOGIN_SUCCESS, user: data })
      })
      .catch(err => {
        console.log('[Error]')
        console.log(err)
        dispatch({ type: authConstants.LOGIN_FAILURE });
      })
  }
}

function SignOut() {
  localStorage.removeItem(authConstants.AUTH_KEY);
  return {
    type: authConstants.LOGOUT
  }
}
