
import react, { useEffect } from 'react';
import { connect } from 'react-redux';

import { authActions } from '../../auth/actions'

function HomeRouter(props) {

  const { user } = props.authentication;

  function _clickLogOut() {
    props.signout();
  }

  return (
    <div>
      <h3>Welcome {user.name?.first} {user.name?.last}</h3>
      <button onClick={_clickLogOut}>SignOut</button>
    </div>
  )
}

function mapState(state) {
  return state;
}

const actionCreators = {
  signout: authActions.SignOut
}

const connectedHomeRouter = connect(mapState, actionCreators)(HomeRouter);
export { connectedHomeRouter as HomeRouter }