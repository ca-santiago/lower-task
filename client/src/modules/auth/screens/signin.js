
import react, { useState } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';

function SignInScreen(props) {
  const { signin } = props;

  const [err, setErr] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  function _signin(e) {
    e.preventDefault();

    if (!pass || !email) {
      console.log(pass, email)
      setErr('Correo y contraseña requeridos')
      return
    }
    setErr('');
    signin({ email, pass });
  }

  return (
    <div>
      <form onSubmit={_signin}>
        {err && <p>{err}</p>}
        <input
          type="email" placeholder="Email"
          onChange={(data) => setEmail(data.target.value)} />
        <input
          type="password" placeholder="Password"
          onChange={e => setPass(e.target.value)} />
        <input type="submit" value="Signin" />
      </form>
    </div>
  )
}

function mapState(state) {
  return state;
}

const actionCreators = {
  signin: authActions.SignIn,
  signout: authActions.SignOut,
}

const mappedScreen = connect(mapState, actionCreators)(SignInScreen);
export { mappedScreen as SignInScreen }