
import react from 'react';
import { connect } from "react-redux";
import { authActions } from '../../auth/actions';

function HomeScreen(props) {

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

const mapState = (state) => state

const actionCreators = {
  signout: authActions.SignOut
}

const connectedHomeScreen = connect(mapState, actionCreators)(HomeScreen);
export { connectedHomeScreen as HomeScreen };