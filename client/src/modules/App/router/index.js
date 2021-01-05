
import react, { useEffect } from 'react';
import { connect } from 'react-redux';

import { MainRouter } from './Main'
import { AuthRouter } from './Auth'

function AppRouter(props) {

  useEffect(() => {
    console.log(props)
  })

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

const connectedAppRouter = connect(mapState, {})(AppRouter);
export { connectedAppRouter as AppRouter }
