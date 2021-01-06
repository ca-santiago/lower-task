
import React from 'react';
import { connect } from 'react-redux';

import { MainRouter } from './Main'
import { AuthRouter } from './Auth'
import { AuthContext } from '../../auth/helpers';

function AppRouter(props) {
  return (
    <>
      {
        props.authentication?.loggedIn ?
          <MainRouter />
          :
          <AuthRouter />
      }
    </>
  )
}

const mapState = (state) => state;

const connectedAppRouter = connect(mapState, {}, null, { context: AuthContext })(AppRouter);
export { connectedAppRouter as AppRouter }
